const UserModel = require("../models/user.model");
const isBlocking=async(req,res,next)=>{
    const userId=req.body.userId;
    // console.log(`Lead  check ${userId}`)
    try {
        const user=await UserModel.findById(userId).populate("userType");
        // console.log(user.isBlocked);
        if(user.isBlocked===true){
            next()
        }else{
            res.status(401).json({success:false,message:"This user has been blocked. Please contact the administrator."});
        }
    } catch (error) {
        res.status(401).json({success:false,message:"serrevr internet error"})
    }
}
module.exports=isBlocking;