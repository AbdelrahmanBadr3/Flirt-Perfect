let questionsData = require('../data/questions.json').data;
const Question = require('../models/Question');
//notification to user edit prof 
const isEmpty = questions =>
questions === null ||
questions === undefined ||
 (typeof questions === 'object' && Object.keys(questions).length === 0) ||
 (typeof questions === 'string' && questions.trim().length === 0) || ( questions.data.length == 0 ) ;
async function setQuestions() {
    const questions=await Question.find();

        if(isEmpty(questions)){ 
            let i
            for(i=0;i< questionsData.length;i++ ){
                Question.create(questionsData[i]);
            }
        }

}
module.exports.setQuestions = setQuestions
