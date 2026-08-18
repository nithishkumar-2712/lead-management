const express = require("express");
const Athucheck = require("../middlewares/Athu");
const isBlocking = require("../middlewares/Blocking");
const { Licencedelete,ExcutiveCell,Allinsulatrion } = require("../controllers/Insulation.controller");
const router = express.Router();
router.put("/api/Licencedelete/:id",Athucheck,isBlocking,Licencedelete);
router.post("/api/searchexcutivecell",Athucheck,isBlocking,ExcutiveCell);
router.get("/api/Allinsulatrion",Athucheck,isBlocking,Allinsulatrion);
// router.post("/api/searchLead/excutive",Athucheck,isBlocking,createRole);
// router.put("/api/updateRole/:id",Athucheck,isBlocking,updateRole);
// Admin Router

module.exports = router;