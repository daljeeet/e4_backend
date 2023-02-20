const express = require("express")
const User = require("../model/user.modal")
const userRoute = express.Router();
const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")

userRoute.post("/register",async(req,res)=>{
    try{
        const emailExist = await User.find({email:req.body.email})
        const userExist = await User.find({name:req.body.name})
        if(emailExist.length==0&&userExist.length==0){
                const {password} = req.body;
                const encPass = await bcrypt.hash(password,+process.env.SALT_ROUNDS)
                let body = {...req.body,password:encPass}
                let newUser = new User(body);
                await newUser.save();
                res.send({msg:"user registered Successfully"})
        }else{
            res.send({msg:"user already exist, please login"})
        }
    }catch(err){
        res.status(400).send({msg:"something went wrong",err:err})
    }
})


userRoute.post("/login",async(req,res)=>{
try{
    const userExist =await User.find({email:req.body.email});
    if(userExist.length>0){
           let passMatch= await bcrypt.compare(req.body.password,userExist[0].password)
       if(passMatch){
      let token =  await jwt.sign({id:userExist[0]._id},process.env.KEY)
        res.status(200).send({msg:"Login Success,",token:token})
       }else{
           res.send({msg:"invalid Credientials"})
       }
    }else{
        res.send({msg:"invalid Credientials"})
    }

}catch(err){
    res.send({msg:"invalid Credientials"})
}
})


module.exports = userRoute;