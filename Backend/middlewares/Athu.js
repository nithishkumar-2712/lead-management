const jwt=require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../models/user.model");
const Athucheck=async(req,res,next)=>{
    const{token}=req.cookies
    try {
        if(!token){
            return res.status(401).json({success:false,message:"Token is not found"})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        if(decode.id){
            req.body=req.body||{};
            const user=await UserModel.findById(decode.id);
            // console.log(user)

            if(user){
                req.body.userId=user._id,
                req.body.userName=user.Name

                next();
            }else{
                res.status(401).json({success:false,message:"User is not found"})
            }
        }else{        
            res.status(401).json({success:false,message:"token is invaled"});
        }
        
    } catch (error) {
        res.status(401).json({success:false,message:"INSERNET SERVER ERROR"})
        
    }
}
module.exports=Athucheck