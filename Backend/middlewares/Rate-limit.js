const Ratelimit=require("express-rate-limit");
const Loginratelimit=Ratelimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: { success:false,message:"Too many requests, please try again later."},
    standardHeaders: true, 
    legacyHeaders: false,
})
module.exports=Loginratelimit