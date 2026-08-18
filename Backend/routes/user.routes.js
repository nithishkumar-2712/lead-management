const express = require("express");
const { Register,FetchUser,Login,Logout,getExecutives,profileget,getuserExecutivelead,getBranchHeads,profile,blockUser} = require("../controllers/user.controller");
const Athucheck = require("../middlewares/Athu");
const Leadcheck = require("../middlewares/LeadCheck");
const BranchHeadcheck = require("../middlewares/BranchHead");
const Admincheck = require("../middlewares/Admin");
const isBlocking = require("../middlewares/Blocking");
const Loginratelimit = require("../middlewares/Rate-limit");
const route = express.Router();
// Admin router
route.get("/api/Fetchuser",Athucheck,isBlocking,Admincheck,FetchUser);
route.post("/api/register",Register);
route.put("/api/blockUser/:id",Athucheck,isBlocking,Admincheck,blockUser );
// User router Loginratelimit
route.post("/api/login",Loginratelimit,Login);
route.post("/api/Logout",Athucheck, Logout);
route.post("/api/Prfofil",Athucheck,isBlocking, profileget);

// LeadUser Check
route.get("/api/branch-heads",Athucheck,isBlocking,Leadcheck,getBranchHeads);
route.get("/api/executives-User",Athucheck,isBlocking,Leadcheck, getuserExecutivelead);

// TokenCheck
route.get("/api/tokencheck",Athucheck, profile);
// Branch Head UserCheck
route.get("/executives",Athucheck,isBlocking, getExecutives);
// Excutive User  excutive report
// route.get("/api/excutiveuseronly ",Athucheck,isBlocking, OwnBranchExecutives);
module.exports = route;