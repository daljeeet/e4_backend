const express = require("express")
const postRoute = express.Router();
const Post = require("../model/post.modal")


postRoute.get("/",async(req,res)=>{
    try{
        const filter = {devide:req.query.device}
        let allPosts = await Post.find({author_id:req.body.author_id})
        res.send({data:allPosts})
    }catch(err){
        res.send({msg:"something went wrong, Please try again"})
    }
})
postRoute.post("/",async(req,res)=>{
    try{
        console.log(req.body)
        let newPost = new Post(req.body)
        await newPost.save()
        res.send({msg:"post added successfully"})
    }catch(err){
        res.send({msg:"something went wrong, Please try again"})
    }
})


postRoute.get("/top",async(req,res)=>{
    try{
        let allPosts = await Post.find({owner:req.body.id})
        res.send({data:allPosts})
    }catch(err){
        res.send({msg:"something went wrong, Please try again"})
    }
})

postRoute.patch("/update/:_id",async(req,res)=>{
    try{
        await Post.findByIdAndUpdate(req.params,req.body)
        res.send({msg:"Post updated successfully"})
    }catch(err){
        res.send({msg:"something went wrong, Please try again"})
    }
})


postRoute.delete("/delete/:_id",async(req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params)
        res.send({msg:"deleted successfully"})
    }catch(err){
        res.send({msg:"something went wrong, Please try again"})
    }
})







module.exports = postRoute