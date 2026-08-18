const RoleModel = require("../models/role.model");
const UserModel = require("../models/user.model");

// CREATE ROLE
const createRole = async (req, res) => {
  try {
    const { roleName, isActive } = req.body;

    const roleExists = await RoleModel.findOne({ roleName });

    if (roleExists) {
      return res.status(400).json({
        success: false,
        message: "Role already exists"
      });
    }

    const role = await RoleModel.create({
      roleName,
      isActive
    });

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL ROLES
const getRoles = async (req, res) => {
  try {
    const UserId=req.body.userId; 
    const Admincheck = await UserModel.findById({_id:UserId}).populate("userType");
    // console.log(Admincheck.userType.roleName)
    const roles = Admincheck.userType.roleName === "Admin"
      ? await RoleModel.find()
      : await RoleModel.find({ isActive: true });

    res.status(200).json({
      success: true,
      data: roles
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// GET ALL ROLES
const getRolesRegistre = async (req, res) => {
  try {
      const roles = await RoleModel.find({ isActive: true });
    res.status(200).json({
      success: true,
      data: roles
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE ROLE
const updateRole = async (req, res) => {
  try {
    const { roleName } = req.body;
    // console.log(roleName);

    const role = await RoleModel.findByIdAndUpdate(
      req.params.id,
      {
        roleName
      },
      { new: true }
    );

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const Roledelete = async (req, res) => {
  const{isActive}=req.body;
  try {
    await RoleModel.findByIdAndUpdate(
      req.params.id,
      { isActive: isActive }
    );

    res.json({
      success: true,
      message: "User Role blocked successfully"
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createRole,
  getRoles,
  updateRole,
  Roledelete,
  getRolesRegistre
};