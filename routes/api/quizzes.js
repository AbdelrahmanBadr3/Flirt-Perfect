const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz');

const User = require('../../models/User');
router.get('/',async (req, res) => {
    const quizzes=await Quiz.find();
    res.json({ data: quizzes })
});


router.post('/:id', async(req, res) => {
    try{
	const sequence = req.body.sequence;
    const userID = req.params.id;
    const user= await User.findById(userID)
    const userSchema={
        name:user.name,
        _id:user._id
    }
    
    const quiz = await Quiz.findOne({sequence})
    if(!quiz) {
        const usersArray=[userSchema]
        const quizSchema={
          sequence,
          users:usersArray  
        }
        await Quiz.create(quizSchema)
    }else{
        console.log("hello Here")
        
        quiz.users.unshift(userSchema)
        console.log(quiz.users)
        await Quiz.findOneAndUpdate({sequence},{users:quiz.users})
    }
    console.log("hello there")

    const quizAfterAnswer = await Quiz.findOne({sequence})

    return res.json({ msg:"Quiz was created successfully" ,data: quizAfterAnswer });}
    catch(error)
    {
        console.log(error)
    }
});


module.exports = router;