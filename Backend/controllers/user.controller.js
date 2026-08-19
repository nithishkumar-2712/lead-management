const UserModel = require("../models/user.model");
const jwt =require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();
const RoleModel = require("../models/Role.model");

const Register = async (req, res) => {
const {
  userType,
  isBlocked,
  branch,
  username,
  Password,
  Number,
  Email,
} = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    // console.log(existingUser)

    if (existingUser) {
      return res.json({
        success: false,
        message: "Username already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await UserModel.create({
      userType,
      username,
      password: hashedPassword,
      isBlocked,
      branch,
      Number,
      Email
    });

    res.json({
      success: true,
      message: "User registered successfully",
      data: user
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
const Login = async (req, res) => {
  const { username, userType, password } = req.body;
  // console.log(req.body)

  try {
    const user = await UserModel.findOne({ username, userType: userType}).populate("userType");
    // console.log(user);
    if (!user) {
      return res.json({
        success: false,
        message: "Username or User Type is incorrect"
      });
    }

    if (user.isBlocked === false) {
      return res.json({
        success: false,
        message: "User account is blocked"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Password is incorrect"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const blockUser = async (req, res) => {
  const{isBlocked}=req.body
  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { isBlocked: isBlocked }
    );

    res.json({
      success: true,
      message: "User blocked successfully"
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getBranchHeads = async (req, res) => {
  try {
    const BranchHeadRole = await RoleModel.findOne({
      roleName: "Branch Head",
      isActive:true
    });
    // console.log(BranchHeadRole)
    const branchHeads = await UserModel.find({
      userType:BranchHeadRole._id,
      isBlocked:true
    }).populate("branch");

    res.status(200).json({
      success: true,
      data: branchHeads,
      message:"successfully get Branch Head id"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getuserExecutivelead = async (req, res) => {
  try {
    const executiveeRole = await RoleModel.findOne({
      roleName: "Executives",
      isActive:true
    });
    // console.log(executiveeRole)
    const executives = await UserModel.find({
      userType:executiveeRole._id,
      isBlocked:true
    }).select("-password");
    

    res.status(200).json({
      success: true,
      data: executives,
      message: "Executives fetched successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const profile = async (req, res) => {
  try {
    const id = req.body.userId;
    const data = await UserModel.findById(id).populate("userType").populate("branch");
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const FetchUser = async (req, res) => {
  try {
    const data = await UserModel.find().populate("userType").populate("branch");
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const profileget = async (req, res) => {
  try {
    const id = req.body.userId;
    const data = await UserModel.findById(id).populate("userType").populate("branch");
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getExecutives = async (req, res) => {
  try {

    // const { userId } = req.body;
    const userId=req.body.userId; 
    // Branch Head Details
    const user = await UserModel.findById(userId)
      .populate("userType")
      .populate("branch");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    // Executive Role ID
    const executiveRole = await RoleModel.findOne({
      roleName: "Executives",
      isActive:true
    });

    if (!executiveRole) {
      return res.status(404).json({
        success: false,
        message: "Executive Role Not Found",
      });
    }
    // Same Branch + Executive
    const executives = await UserModel.find({
      branch: user.branch._id,
      userType: executiveRole._id,
      isBlocked:true
    })
      .populate("branch")
      .populate("userType")
      .select("_id username branch userType");

    res.status(200).json({
      success: true,
      data: executives,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  Register,
  profileget,
  Login,
  Logout,
  blockUser,
  getBranchHeads,
  profile,
  getExecutives,
  getuserExecutivelead,
  FetchUser

};