const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req,res,next) =>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You need to log in for access"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            res.status(401).json({error:"Yo need to log in for access"});
        }

        const {_id} = payload;
        User.findById(_id).then(userdata=>{
            req.user = userdata;
            next();
        })
    })
}