const UserModel = require("../models/user.model");
const BranchHeadcheck=async(req,res,next)=>{
    const userId=req.body.userId;
    // console.log(`Lead  check ${userId}`)
    try {
        const user=await UserModel.findById(userId).populate("userType");
        // console.log(user.userType.roleName);
        if(user.userType.roleName==="Branch Head"){
            next()
        }else{
            res.status(401).json({success:false,message:"Branch Head only Access this route"});
        }
    } catch (error) {
        res.status(401).json({success:false,message:"serrevr internet error"})
    }
}
module.exports=BranchHeadcheck;