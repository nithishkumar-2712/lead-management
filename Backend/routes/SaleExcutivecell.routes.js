const express = require("express");
const Athucheck = require("../middlewares/Athu");
const isBlocking = require("../middlewares/Blocking");
const {servicecells,Allservicecells,Todaycell } = require("../controllers/SaleExcutivecellcontroller");
const router = express.Router();
router.post("/api/servicecells",Athucheck,isBlocking,servicecells);
router.get("/api/Allservicecells",Allservicecells);
router.get("/api/Todaycell",Athucheck,isBlocking,Todaycell);
// Admin Router

module.exports = router;