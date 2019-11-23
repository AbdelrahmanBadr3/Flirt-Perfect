const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        default:"NOTSPECIFED",
        enum:["MALE","FEMALE","NOTSPECIFED"]
    },
    dateOFBirth:{
        type:Date,
        required:true
    },
    isActivated:{
        type:Boolean,
        default:false
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    answerID:{
        type:mongoose.Schema.Types.ObjectId,
        required:false
    }


});


const User= mongoose.model('users', UserSchema)
module.exports = User
