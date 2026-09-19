const express = require("express");
const { forgotPassword,resetPassword } = require("../controllers/Forgetpassword.controller");

const router = express.Router();

// const {forgotPassword,resetPassword} = require("../controllers/user.controller");

// Forgot Password
router.post("/forgot-password",forgotPassword);


// Reset Password
router.post("/reset-password/:token", resetPassword);


module.exports = router;