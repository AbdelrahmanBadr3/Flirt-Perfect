const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnswerSchema = new Schema({
    answer:{
        type:String,
        required:true
    },
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }


},{_id:false});
const Question = new Schema({
    question:{
        type:String,
        required:true
    },
    answers:[AnswerSchema],
    weight:{
        type:Number,
        required:true
    }

});

module.exports = Question = mongoose.model('questions', Question);
