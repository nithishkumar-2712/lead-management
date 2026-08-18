const BusinessModel = require("../models/businessType.model");
const UserModel = require("../models/user.model");

// CREATE Business Type
const createBusinessType = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const type = await BusinessModel.create({
      name,
      description,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Business type created successfully",
      data: type
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getBusinessTypes = async (req, res) => {
  try {
    const UserId=req.body.userId; 
    const Admincheck = await UserModel.findById({_id:UserId}).populate("userType");
    // console.log(Admincheck.userType.roleName)
    const types = Admincheck.userType.roleName === "Admin"
      ? await BusinessModel.find()
      : await BusinessModel.find({ isActive: true });
    res.status(200).json({
      success: true,
      data: types
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const updateBusinessType = async (req, res) => {
  try {
    const { name, description } = req.body;

    const type = await BusinessModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
      },
      { new: true }
    );

    if (!type) {
      return res.status(404).json({
        success: false,
        message: "Business type not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Business type updated successfully",
      data: type
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const businessdelete = async (req, res) => {
  const{isActive}=req.body;
  try {
    await BusinessModel.findByIdAndUpdate(
      req.params.id,
      { isActive: isActive }
    );

    res.json({
      success: true,
      message: "User Business Type blocked successfully"
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
  createBusinessType,
  getBusinessTypes,
  updateBusinessType,
  businessdelete
};