const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
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
    dateOFBrith:{
        type:Date,
        required:true
    },
    isActiveted:{
        type:Boolean,
        default:false
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    answerID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }


});



module.exports = user = mongoose.model('users', User);