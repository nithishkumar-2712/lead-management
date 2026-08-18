const UserModel = require("../models/user.model");
const Admincheck=async(req,res,next)=>{
    const userId=req.body.userId;
    // console.log(`Lead  check ${userId}`)
    try {
        const user=await UserModel.findById(userId).populate("userType");
        if(user.userType.roleName==="Admin"){
            next()
        }else{
            res.status(401).json({success:false,message:"Branch Head only Access this route"});
        }
    } catch (error) {
        res.status(401).json({success:false,message:"serrevr internet error"})
    }
}
module.exports=Admincheck;