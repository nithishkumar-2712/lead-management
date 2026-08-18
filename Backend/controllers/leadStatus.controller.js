const LeadstatusModel = require("../models/leadStatus.model");
const UserModel = require("../models/user.model");
// CREATE Lead Status
const createLeadStatus = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    const status = await LeadstatusModel.create({
      name,
      isActive
    });

    res.status(201).json({
      success: true,
      message: "Lead status created successfully",
      data: status
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getLeadStatuses = async (req, res) => {
  try {
    // const statuses = await LeadstatusModel.find();
    const UserId=req.body.userId; 
    const Admincheck = await UserModel.findById({_id:UserId}).populate("userType");
    // console.log(Admincheck.userType.roleName)
    const statuses = Admincheck.userType.roleName === "Admin"
      ? await LeadstatusModel.find()
      : await LeadstatusModel.find({ isActive: true });

    res.status(200).json({
      success: true,
      data: statuses
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const updateLeadStatus = async (req, res) => {
  try {
    const { name } = req.body;

    const status = await LeadstatusModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
      },
      { new: true }
    );

    if (!status) {
      return res.status(404).json({
        success: false,
        message: "Lead status not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: status
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const LeadStatusdelete = async (req, res) => {
  const{isActive}=req.body
  try {
    await LeadstatusModel.findByIdAndUpdate(
      req.params.id,
      { isActive: isActive }
    );

    res.json({
      success: true,
      message: "Status blocked successfully"
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
  createLeadStatus,
  getLeadStatuses,
  updateLeadStatus,
  LeadStatusdelete
};