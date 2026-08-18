const express = require("express");
const { createBranch, getBranches, updateBranch,Branchdelete } = require("../controllers/branch.controller");
const Athucheck = require("../middlewares/Athu");
const Admincheck = require("../middlewares/Admin");
const isBlocking = require("../middlewares/Blocking");
const router = express.Router();

// router.get("/api/branches/:id", getBranchById);
router.post("/api/branchescreate",Athucheck,isBlocking,Admincheck,createBranch);
router.put("/api/branchesUpdate/:id",Athucheck,isBlocking,Admincheck, updateBranch);
router.put("/api/branchesdelete/:id",Athucheck,isBlocking,Admincheck, Branchdelete);
router.get("/api/branchesget",Athucheck,isBlocking, getBranches);
module.exports = router;