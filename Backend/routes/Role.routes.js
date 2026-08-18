const express = require("express");
const { createRole,getRoles,updateRole,Roledelete,getRolesRegistre} = require("../controllers/Role.controller");
const Athucheck = require("../middlewares/Athu");
const Admincheck = require("../middlewares/Admin");
const isBlocking = require("../middlewares/Blocking");
const router = express.Router();
// Admin Router
router.post("/api/creatRole",Athucheck,isBlocking,Admincheck,createRole);
router.put("/api/updateRole/:id",Athucheck,isBlocking,Admincheck,updateRole);
router.put("/api/Roledelte/:id",Athucheck,isBlocking,Admincheck,Roledelete);
// Admin and user Router
router.get("/api/GetRole",Athucheck,getRoles);
//get all router
router.get("/api/GetRoleregistre",getRolesRegistre);

module.exports = router;