
const CellsModel = require("../models/SaleExcutivecell");
const UserModel = require("../models/user.model");


const servicecells = async (req, res) => {
  try {
    const {
      CustomerId,
      leadId,
      ContactPerson,
      ContactNo,
      Service,
      Inward,
      cellstatus,
      AssiginedTo,
      Branch,
      CellDate,
      EngineerRemarks,
    } = req.body;

    const UserId = req.body.userId;

    console.log(req.body);

    const servicecells = await CellsModel.create({
      UserId,
      CustomerId,
      LeadId: leadId,
      ContactPerson,
      ContactNo,
      Service,
      Inward,
      cellstatus,
      AssiginedTo,
      Branch,
      CellDate,
      EngineerRemarks,
    });

    res.status(200).json({
      success: true,
      message: "Successfully",
      data: servicecells,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const Allservicecells = async (req, res) => {
  try {
    const allServiceCells = await CellsModel.find()
      .populate("CustomerId")
      .populate("LeadId")
      .populate("UserId", "username")
      .populate("AssiginedTo", "username")
      .populate("Branch", "branchName");

    res.status(200).json({
      success: true,
      message: "Successfully",
      data: allServiceCells,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const Todaycell = async (req, res) => {
  const UserId = req.body.userId
  console.log(UserId)
  try {
    const Todaycell = await CellsModel.find({UserId:UserId})
      .populate("CustomerId")
      .populate("LeadId")
      .populate("UserId", "username")
      .populate("AssiginedTo", "username")
      .populate("Branch", "branchName");

    res.status(200).json({
      success: true,
      message: "Successfully",
      data: Todaycell,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  servicecells,
  Allservicecells,
  Todaycell,
};