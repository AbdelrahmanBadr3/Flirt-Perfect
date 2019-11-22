const express = require('express');
const router = express.Router();
const User = require('../../models/User');

var jwt_decode = require('jwt-decode');
const userValidator = require('../../validations/userValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenKey = require('../../config/keys_dev').secretOrKey;
const passport = require('passport');
require('../../config/passport')(passport);

// /const uuid = require('uuid');

//Getting all users
router.get('/',async (req, res) => {
    const users=await User.find();
    res.json({ data: users })
});


//Get certain user by ID
router.get('/SpecificUser', passport.authenticate('jwt', { session: false }), async (req, res) =>{
    try{
    const userID=req.user.id
    const user = await User.findById(userID)
    if(!user) return res.status(404).send({error: 'User does not exist'})
    return res.json({ msg:"User was fetched successfully" ,data: user })

    }
   catch(error)
   {
       console.log(error)
   }
})


//Creating new User
router.post('/', async(req, res) => {
    try{
	const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;
    const dateOFBrith = req.body.dateOFBrith;
    const newUser = {
		name,
        password,
        email,
        gender,
        dateOFBrith
		//id: uuid.v4(),
    };
    const dbUser= await User.create(newUser);
    return res.json({ msg:"User was created successfully" ,data: dbUser });}
    catch(error)
    {
        console.log(error)
    }
});


//Updating the user
router.put('/SpecificUser', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
   //   const id = req.params.id
    const userID=req.user.id

     const user = await User.findById(userID)
     if(!user) return res.status(404).send({error: 'User does not exist'})
     const updatedUser = await User.findByIdAndUpdate({_id : userID},req.body)
     res.json({msg: 'User updated successfully'})
    }
    catch(error) {

        console.log(error)
    }  
 })

 //Deleting a user

 router.delete('/SpecificUser', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
     const userID = req.user.id

     const deletedUser = await User.findByIdAndRemove(userID)
     res.json({msg:'User was deleted successfully', data: deletedUser})
    }
    catch(error) {

        console.log(error)
    }  
 })



 //Register
 router.post('/register', async (req,res) => {
    console.log(req.body)
    const isValidated = userValidator.createValidation(req.body);
    if (isValidated.error) {
        console.log(isValidated.error.details[0].message);
    return  res.status(400).send({msg: isValidated.error.details[0].message ,error:"validation error"}) ;
    }
    const body={
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      dateOfBirth:req.body.dateOfBirth,
      gender:req.body.gender
      
    }
   
    const user = await User.findOne({email:body.email})
    if(user) {
      console.log("already exist")
      return res.status(400).json({error: 'Email already exists',msg:"Email already exists"})
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(body.password,salt)
    const newUser = new User({
            name:body.name,
            email:body.email,
            password: hashedPassword ,
            gender:body.gender,
            dateOFBrith:body.dateOfBirth
        })
    newUser
    .save()
    .then(user => res.json({data: user}))
    .catch(err => res.json({error: 'Can not create user'},console.log(err)))
  })

 //Login
 router.post('/login', async (req, res) => {
	try {
    const { email, password } = req.body;
    console.log(req.body)
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: 'Email does not exist' });
		const match = bcrypt.compareSync(password, user.password);
		if (match) {
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            const token = jwt.sign(payload, tokenKey, { expiresIn: '24h' })
            res.json({data: `Bearer ${token}`})
            return res.json({ data: 'Token' })
        }
		else return res.status(400).send({ password: 'Wrong password',msg:"wrong password" });
	} catch (e) {}
});



module.exports = router;