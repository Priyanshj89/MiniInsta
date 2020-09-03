//schema is a blueprint that tells the mongoDb database the properties of the
//data we are going to store

const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/priyanshjain/image/upload/v1599127267/no-image_xcmh83.gif"
    },
    followers:[{type:ObjectId, ref:"User"}],
    following:[{type:ObjectId, ref:"User"}]
})

mongoose.model('User',userSchema);