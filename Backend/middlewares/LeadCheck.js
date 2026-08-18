const UserModel = require("../models/user.model");
const Leadcheck=async(req,res,next)=>{
    const userId=req.body.userId;
    // console.log(`Lead  check ${userId}`)
    try {
        const user=await UserModel.findById(userId).populate("userType");
        // console.log(user.userType.roleName);
        if(user.userType.roleName==="Lead"){
            next()
        }else{
            res.status(401).json({success:false,message:"Lead only Access this route"});
        }
    } catch (error) {
        res.status(401).json({success:false,message:"serrevr internet error"})
    }
}
module.exports=Leadcheck;