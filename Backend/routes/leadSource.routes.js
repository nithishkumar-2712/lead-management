const express = require("express");
const { createLeadSource,getLeadSources,updateLeadSource,leadSourcedelete} = require("../controllers/leadSource.controller");
const Athucheck = require("../middlewares/Athu");
const Admincheck = require("../middlewares/Admin");
const isBlocking = require("../middlewares/Blocking");
const router = express.Router();
// CRUD Routes
router.post("/api/Leadsourcecreat",Athucheck,isBlocking,Admincheck, createLeadSource);
router.get("/api/Leadsourceget",Athucheck, getLeadSources);
router.put("/api/Leadsourceupdate/:id",Athucheck,isBlocking,Admincheck, updateLeadSource);
router.put("/api/Leadsourcedelete/:id",Athucheck,isBlocking,Admincheck, leadSourcedelete);

module.exports = router;