const BranchModel = require("../models/branch.model");
const UserModel = require("../models/user.model");

const createBranch = async (req, res) => {
  try {
    const { branchName, address, phone, isActive } = req.body;

    const branch = await BranchModel.create({branchName,address,phone,isActive});

    res.status(201).json({
      success: true,
      message: "Branch created successfully",
      data: branch
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL Branches
const getBranches = async (req, res) => {
  try {
    const UserId=req.body.userId; 
    const Admincheck = await UserModel.findById({_id:UserId}).populate("userType");
    // console.log(Admincheck.userType.roleName)
    const branches = Admincheck.userType.roleName === "Admin"
      ? await BranchModel.find()
      : await BranchModel.find({ isActive: true });

    res.status(200).json({
      success: true,
      data: branches
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// // GET SINGLE Branch
// const getBranchById = async (req, res) => {
//   try {
//     const branch = await Branch.findById(req.params.id);

//     if (!branch) {
//       return res.status(404).json({
//         success: false,
//         message: "Branch not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: branch
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// UPDATE Branch
const updateBranch = async (req, res) => {
  try {
    const { branchName, address, phone } = req.body;

    const branch = await BranchModel.findByIdAndUpdate(
      req.params.id,
      {
        branchName,
        address,
        phone
      },
      { new: true }
    );

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Branch updated successfully",
      data: branch
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const Branchdelete = async (req, res) => {
  const{isActive}=req.body;
  try {
    await BranchModel.findByIdAndUpdate(
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
  createBranch,
  getBranches,
   Branchdelete,
  updateBranch,
};