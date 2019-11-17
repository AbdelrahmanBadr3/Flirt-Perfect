const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsersSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }


},{_id:false});

const Answer = new Schema({
    sequence:{
        type:String,
        required:true
    },
    users:[UsersSchema]
});

module.exports = answer = mongoose.model('answers', Answer);
