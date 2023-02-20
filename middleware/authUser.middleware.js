const jwt = require("jsonwebtoken")
require("dotenv").config()
const authUser = async(req,res,next)=>{
try{
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token,process.env.KEY,(err,ans)=>{
        if(err)throw err
        req.body= {...req.body,author_id:ans.id}
            next()
    })    

}catch(err){
    res.send({error:err})
}



}

module.exports = authUser;