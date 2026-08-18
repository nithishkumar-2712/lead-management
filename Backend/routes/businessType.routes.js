const express = require("express");
const { createBusinessType,getBusinessTypes,businessdelete,updateBusinessType} = require("../controllers/businessType.controller");
const Athucheck = require("../middlewares/Athu");
const Admincheck = require("../middlewares/Admin");
const isBlocking = require("../middlewares/Blocking");
const router = express.Router();
// CRUD Routes
router.post("/api/businesstypecreat",Athucheck,isBlocking,Admincheck,createBusinessType);
router.get("/api/businesstypegett",Athucheck,isBlocking, getBusinessTypes);
// router.get("/api/businesstypecreat:id", getBusinessTypeById);
router.put("/api/businessupdate/:id",Athucheck,isBlocking,Admincheck, updateBusinessType);
router.put("/api/businessdelete/:id",Athucheck,isBlocking,Admincheck, businessdelete);
module.exports = router;