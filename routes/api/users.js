const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const uuid = require('uuid');

//Getting all users
router.get('/', (req, res) => {
    const users=await User.find();
    res.json({ data: users })
});


//Get certain user by ID
router.get('/:id', async(req, res) =>{
    try{
    const userID=req.params.id
    const user = await User.findById(userID)
    if(!user) return res.status(404).send({error: 'User does not exist'})
    res.json({ msg:"User was fetched successfully" ,data: user })
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
    const newUser = {
		name,
        password,
        email,
        gender
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
router.put('/:id', async (req,res) => {
    try {
   //   const id = req.params.id
    const userID=req.params.id
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
 router.delete('/:id', async (req,res) => {
    try {
     const userID = req.params.id
     const deletedUser = await User.findByIdAndRemove(userID)
     res.json({msg:'User was deleted successfully', data: deletedUser})
    }
    catch(error) {

        console.log(error)
    }  
 })

module.exports = router;