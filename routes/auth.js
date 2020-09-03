const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User'); //no need to export model, just use its name
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const requireLogin = require('../middleware/requireLogin')


router.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body; //very important
    if(!email || !name || !password){
        return res.status(422).json({err:"Please fill out all the fields"})
    }
    
    User.findOne({email:email})
    .then((savedUser)=>{  //if a user is found then store it in savedUser and proceed
        if(savedUser){
        return res.status(422).json({error:"User with eamil already exists"})
    }
    bcrypt.hash(password,12)
    .then(hashedpassword=>{
        const user = new User({
            email,
            password:hashedpassword,
            name,
            pic:pic
        })
        
        user.save()
        .then(user=>{
            res.json({message:"User Saved Successfully"})
        })
        .catch(err=>{
            console.log(err);
        })
    
        })
        .catch(err=>{
            console.log(err);
        })
    })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please fill all the fields"});
    }
    User.findOne({email:email})//sending actual email to email key of schema
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            console.log(doMatch)
            if(doMatch){
                //res.json({message:"Successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                //console.log(token)
                //assigning jwt with claims, i.e assigning this token to savedUser._id
                //using the _id property/field
                const {_id,name,email,followers,following,pic} = savedUser;
                res.json({token:token, user:{_id,name,email,followers,following,pic}});
            }
            else{
                res.status(422).json({error:"Invalid Password or Email"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;