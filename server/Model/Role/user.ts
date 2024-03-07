import mongoose from "mongoose";


const UserSchema =new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
otp:{
    type:Number,
},
profile:{
    type:String,
}});

const User =mongoose.model('user',UserSchema);

export {User};