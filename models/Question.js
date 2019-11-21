const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question:{
        type:String,
        required:true
    },
    answers:[String],
    weight:{
        type:Number,
        required:true
    }

});
const Question= mongoose.model('questions', QuestionSchema)
module.exports = Question
