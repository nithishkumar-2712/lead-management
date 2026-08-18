const InsulationModel = require("../models/Insulation.model");
const UserModel = require("../models/user.model");
const Licencedelete = async (req, res) => {
  const{isActive}=req.body;
  try {
    await InsulationModel.findByIdAndUpdate(
      req.params.id,
      { isActive: isActive }
    );

    res.json({
      success: true,
      message: "Licence blocked successfully"
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
const ExcutiveCell = async (req, res) => {
  try {
    // const UserId = req.body.userId;

    // const user = await UserModel.findById(UserId).populate("userType");

    // let Insulationid;

    // if (user.userType.roleName === "Admin") {

    //   Insulationid = await InsulationModel.find()
    //     .populate({
    //       path: "leadId",
    //       populate: [
    //         {
    //           path: "assignBranch",
    //           select: "branchName",
    //         },
    //         {
    //           path: "assignedExecutive",
    //           select: "username",
    //         },
    //         {
    //           path: "assignBranchHead",
    //           select: "username",
    //         },
    //         {
    //           path: "status",
    //           select: "name",
    //         },
    //         {
    //           path: "businessType",
    //           select: "name",
    //         },
    //       ],
    //     });

    // } else {

      const { mobile, companyName, licenseId } = req.body;

      let query = {
        isActive: true, 
      };

      if (mobile) {
        query.mobile = mobile;
      } else if (licenseId) {
        query.licenseId = licenseId;
      } else if (companyName) {
        query.companyName = companyName;
      }

      const Insulationid = await InsulationModel.findOne(query)
        .populate({
          path: "leadId",
          populate: [
            {
              path: "assignBranch",
              select: "branchName",
            },
            {
              path: "assignedExecutive",
              select: "username",
            },
            {
              path: "assignBranchHead",
              select: "username",
            },
            {
              path: "status",
              select: "name",
            },
            {
              path: "businessType",
              select: "name",
            },
          ],
        });

      if (!Insulationid) {
        return res.status(404).json({
          success: false,
          message: "Insulation Not Found",
        });
      }
    // }

     res.status(200).json({
      success: true,
      message: "Successfully",
      data: Insulationid,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const Allinsulatrion = async (req, res) => {
  try {


     const Insulationid = await InsulationModel.find()
        .populate({
          path: "leadId",
          populate: [
            {
              path: "assignBranch",
              select: "branchName",
            },
            {
              path: "assignedExecutive",
              select: "username",
            },
            {
              path: "assignedUser",
              select: "username",
            },
            {
              path: "assignBranchHead",
              select: "username",
            },
            {
              path: "status",
              select: "name",
            },
            {
              path: "businessType",
              select: "name",
            },
          ],
        });


     res.status(200).json({
      success: true,
      message: "Successfully",
      data: Insulationid,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  Licencedelete,
  ExcutiveCell,
  Allinsulatrion
};