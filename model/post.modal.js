const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true},
    no_if_comments:{type:Number,required:true},
    author_id:{type:String}
})

const Post = mongoose.model("Post",postSchema)
module.exports = Post