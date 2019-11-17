const express = require('express');
const router = express.Router();
const Question = require('../../models/Question');

//Getting all users
router.get('/',async (req, res) => {
    const questions=await Question.find();
    res.json({ data: questions })
});


//Get certain user by ID
router.get('/:id', async(req, res) =>{
    try{
    const questionID=req.params.id
    const question = await Question.findById(questionID)
    if(!question) return res.status(404).send({error: 'User does not exist'})
    res.json({ msg:"Question was fetched successfully" ,data: question })
    }
   catch(error)
   {
       console.log(error)
   }
})

//Creating new User
router.post('/', async(req, res) => {
    try{
	const question = req.body.question;
    const answers = req.body.answers;
    const weight = req.body.weight;
    const newQuestion = {
		question,
        answers,
        weight
		//id: uuid.v4(),
    };
    const dbQuestion= await Question.create(newQuestion);
    return res.json({ msg:"Question was created successfully" ,data: dbQuestion });}
    catch(error)
    {
        console.log(error)
    }
});


//Updating the user
router.put('/:id', async (req,res) => {
    try {
   //   const id = req.params.id
    const questionID=req.params.id
     const question = await Question.findById(userID)
     if(!question) return res.status(404).send({error: 'Question does not exist'})
     const updatedQuestion = await Question.findByIdAndUpdate({_id : questionID},req.body)
     res.json({msg: 'Question updated successfully', data:updatedQuestion})
    }
    catch(error) {

        console.log(error)
    }  
 })

 //Deleting a user
 router.delete('/:id', async (req,res) => {
    try {
     const questionID = req.params.id
     const deletedQuestion = await Question.findByIdAndRemove(questionID)
     res.json({msg:'Question was deleted successfully', data: deletedQuestion})
    }
    catch(error) {

        console.log(error)
    }  
 })

module.exports = router;