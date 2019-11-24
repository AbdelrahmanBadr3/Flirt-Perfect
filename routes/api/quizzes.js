const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz');

const User = require('../../models/User');
const passport = require('passport');
require('../../config/passport')(passport);


router.get('/',async (req, res) => {
    const quizzes=await Quiz.find();
    res.json({ data: quizzes })
});

router.post('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try{
	const sequence = req.body.sequence;
    const userID = req.user.id;
    const user= await User.findById(userID)
    const userSchema={
        name:user.name,
        id:user._id,
        gender:user.gender
    }
    const currQuiz = await Quiz.findOne({users: {$elemMatch: {id:user._id, name:user.name}}})
    console.log(currQuiz)
    if(!currQuiz){
    const quiz = await Quiz.findOne({sequence})
    if(!quiz) {
        const usersArray=[userSchema]
        const quizSchema={
          sequence,
          users:usersArray  
        }
        await Quiz.create(quizSchema)
    }else{        
        quiz.users.unshift(userSchema)
        console.log(quiz.users)
        await Quiz.findOneAndUpdate({sequence},{users:quiz.users})
    }

    const quizAfterAnswer = await Quiz.findOne({sequence})
    console.log(quizAfterAnswer)
    let users=quizAfterAnswer.users.filter(tempuser=>user.gender!==tempuser.gender)
    return res.json({ msg:"Quiz was created successfully" ,data: users});
}else{
    let users=currQuiz.users.filter(tempuser=>user.gender!==tempuser.gender)
    res.json({ msg:"Quiz was taken before" ,data: users});
}
}
    catch(error)
    {
        console.log(error)
    }
});


module.exports = router;