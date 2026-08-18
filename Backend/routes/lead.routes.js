const express = require("express");
const {OwnLeadinsulation,getLeadByCalledMobileNumber,updateLeadEdit,LeadEdit,searchLeadExcutive,updateLeadREayleadupdate,Leaddelete,BranchExceutiveLead,ExcutiveLead,updateLeadstatus,assignExecutive,BranchheadLead,searchLead,updateCreatLead,updateLead,getLeads,createLead} = require("../controllers/lead.controller");
const Athucheck = require("../middlewares/Athu");
const Leadcheck = require("../middlewares/LeadCheck");
const BranchHeadcheck = require("../middlewares/BranchHead");
const isBlocking = require("../middlewares/Blocking");
const router = express.Router();

// Lead Routes
router.get("/api/leadget",Athucheck,isBlocking,getLeads);
// Admin Routes Lead Active  in active 
router.put("/api/leaddelete/:id",Athucheck,isBlocking,Leaddelete);
// Lead Check User exit or Not
router.post("/api/find-mobile",Athucheck,isBlocking,Leadcheck, getLeadByCalledMobileNumber);
 // Lead Craet
 router.post("/api/Leadcreat",Athucheck,isBlocking,Leadcheck,createLead);
 // Lead Creat !demo Update
 router.put("/api/Leadcreatupadate/:id",Athucheck,isBlocking,Leadcheck, updateCreatLead);
 // Lead Update overall
router.put("/api/leadupdate/:id",Athucheck,isBlocking,Leadcheck,updateLead);
router.put("/api/leadreayupdate/:id",Athucheck,isBlocking,Leadcheck,updateLeadREayleadupdate);


// Get single Lead Show
router.get("/api/lead/search/:id",Athucheck,isBlocking,Leadcheck, searchLead);

router.put("/update/:id",Athucheck, LeadEdit);
router.get("/api/ExceutiveLead",Athucheck,BranchExceutiveLead);

// BranchHead--Router(show the table )
router.get("/api/user-leads",Athucheck,isBlocking,BranchHeadcheck,BranchheadLead);
// Lead Executive assing 
router.put("/api/assign-executive/:id",Athucheck,BranchHeadcheck, assignExecutive);
// Lead Executive or branch head  Status update Edit overall
router.put("/api/update-lead/:id",Athucheck,updateLeadstatus);
router.post("/api/CreatOwnlead",Athucheck,isBlocking,OwnLeadinsulation);

// Executive Router (show the table)
router.get("/api/Excutive-leads",Athucheck,isBlocking,ExcutiveLead);
router.post("/api/searchLead/excutive", searchLeadExcutive);
router.put("/api/lead/update/:id",Athucheck,isBlocking, updateLeadEdit);
module.exports = router;