const express = require("express");
const { connect, mongoose } = require("mongoose");
const authUser = require("./middleware/authUser.middleware");
const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.routes");
mongoose.set('strictQuery', false)
require("dotenv").config()
const app = express()
app.use(express.json())

app.use("/users",userRoute)
app.use("/posts",authUser)
app.use("/posts",postRoute)






app.listen(process.env.PORT,async()=>{
    try{
        await connect(process.env.MONGO_URL)
        console.log("connedted to the database")
    }catch(er){
        console.log("Connection to database failed")
    }
    console.log("the server is running at port",process.env.PORT)
})