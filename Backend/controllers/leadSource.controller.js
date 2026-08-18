const LeadsourceModel = require("../models/leadSource.model");
const UserModel = require("../models/user.model");
// CREATE Lead Source
const createLeadSource = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const source = await LeadsourceModel.create({
      name,
      description,
      isActive
    });

    res.status(201).json({
      success: true,
      message: "Lead source created successfully",
      data: source
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getLeadSources = async (req, res) => {
  try {
    // const sources = await LeadsourceModel.find();
    const UserId=req.body.userId; 
    const Admincheck = await UserModel.findById({_id:UserId}).populate("userType");
    // console.log(Admincheck.userType.roleName)
    const sources = Admincheck.userType.roleName === "Admin"
      ? await LeadsourceModel.find()
      : await LeadsourceModel.find({ isActive: true });

    res.status(200).json({
      success: true,
      data: sources
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const updateLeadSource = async (req, res) => {
  try {
    const { name, description} = req.body;

    const source = await LeadsourceModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
      },
      { new: true }
    );

    if (!source) {
      return res.status(404).json({
        success: false,
        message: "Lead source not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead source updated successfully",
      data: source
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const leadSourcedelete = async (req, res) => {
  const{isActive}=req.body;
  try {
    await LeadsourceModel.findByIdAndUpdate(
      req.params.id,
      { isActive: isActive }
    );

    res.json({
      success: true,
      message: "User Source blocked successfully"
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
  createLeadSource,
  getLeadSources,
  updateLeadSource,
  leadSourcedelete
};