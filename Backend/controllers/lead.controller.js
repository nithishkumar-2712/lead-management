const InsulationModel = require("../models/Insulation.model");
const LeadModel = require("../models/Lead");
const LeadstatusModel = require("../models/leadStatus.model");
const RoleModel = require("../models/Role.model");
const UserModel = require("../models/user.model");

const getLeadByCalledMobileNumber = async (req, res) => {
  try {
    const { mobile } = req.body;
    // console.log(mobile)

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "mobile is required"
      });
    }

    const lead = await LeadModel.findOne({ mobile }).populate("status").populate("assignedUser");
    // console.log(lead)

    if (!lead) {
      return res.json({
        success: false,
        message: "Lead not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead fetched successfully",
      data: lead
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const createLead = async (req, res) => {  
  try {
    const {mobile,district,contactPerson,isActive,remarks,software,city,leadSource,status,referenceDetails,reasonReject} = req.body;
    const UserId=req.body.userId; 
    // console.log(`status${software}`)
    const lead = await LeadModel.create({mobile,contactPerson,isActive,remarks,district,city,software,leadSource,status,referenceDetails,reasonReject,assignedUser:UserId});
    // console.log(`status${lead}`)
    const demostatus= await LeadstatusModel.findById(lead.status)
    // console.log(`Demo Statusss ${demostatus}`)
    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
      demostatus:demostatus
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
const updateLead = async (req, res) => {
  try {
    const {
      calledMobileNumber,
      contactPerson,
      companyName,
      contactNo,
      emailId,
      address,
      remarks,
      businessType,
      software,
      priority,
      area,
      assignBranch,
      leadSource,
      status,
      demoDate,
      referenceDetails,
    } = req.body;

    let branchHeadId = null;

    // =====================================
    // FIND BRANCH HEAD
    // =====================================
    if (assignBranch) {
      const RoleHead = await RoleModel.findOne({
        roleName: "Branch Head",
      });

      if (!RoleHead) {
        return res.status(404).json({
          success: false,
          message: "Branch Head role not found",
        });
      }

      const branchHead = await UserModel.findOne({
        branch: assignBranch,
        userType: RoleHead._id,
      });

      // console.log("Branch Head:", branchHead);

      if (!branchHead) {
        return res.status(404).json({
          success: false,
          message: "No Branch Head found for this branch",
        });
      }

      branchHeadId = branchHead._id;

      // console.log("Branch Head ID:", branchHeadId);
    }

    // =====================================
    // UPDATE LEAD
    // =====================================
    const lead = await LeadModel.findByIdAndUpdate(
      req.params.id,
      {
        calledMobileNumber,
        contactPerson,
        companyName,
        contactNo,
        emailId,
        address,
        remarks,
        businessType,
        software,
        priority,
        area,
        assignBranch,
        assignBranchHead: branchHeadId,
        leadSource,
        status,
        demoDate,
        referenceDetails,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // =====================================
    // NOTIFICATION
    // =====================================
    if (branchHeadId) {
      global.io.emit("branchHeadNotification", {
        leadId: lead._id,
        companyName: lead.companyName,
        contactPerson: lead.contactPerson,
        branchHeadId: branchHeadId,
        message: "New Lead Assigned",
      });
    }

    global.io.emit("leadUpdated");

    // =====================================
    // RESPONSE
    // =====================================
    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateLeadREayleadupdate = async (req, res) => {
  try {
    const {calledMobileNumber,remarks,software,leadSource,status,referenceDetails,ifCallLater,district,reasonReject} = req.body;
    // console.log(req.body)
    const lead = await LeadModel.findByIdAndUpdate(
      req.params.id,
      {calledMobileNumber,remarks,software,leadSource,status,referenceDetails,ifCallLater,district,reasonReject
      },
      { new: true }
      
    );
    const demostatus= await LeadstatusModel.findById(lead.status)

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }

// if (assignedExecutive) {
//     // console.log("Emitting executiveNotification");

//     global.io.emit("executiveNotification", {
//         leadId: lead._id,
//         companyName: lead.companyName,
//         contactPerson: lead.contactPerson,
//         executiveId: assignedExecutive,
//         message: "New Lead Assigned"
//     });
// }
//     global.io.emit("leadUpdated");


    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
      demostatus:demostatus
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getLeads = async (req, res) => {
  try {
    const UserId=req.body.userId; 
    const Admincheck = await UserModel.findById({_id:UserId}).populate("userType");
    // console.log(Admincheck.userType.roleName)
    const leads = Admincheck.userType.roleName === "Admin"
      ? await LeadModel.find()    
      .populate("businessType")
      .populate("assignBranch")
      .populate("leadSource")
      .populate("assignBranchHead")
      .populate("assignedExecutive")
      .populate("assignedUser")
      .populate("status")
      : await LeadModel.find({isActive:true})
      .populate("businessType")
      .populate("assignBranch")
      .populate("leadSource")
      .populate("assignBranchHead")
      .populate("assignedExecutive")
      .populate("assignedUser")
      .populate("status");;
    res.json({ success: true, data: leads });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const updateCreatLead = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const { mobile,remarks,software,leadSource,status,referenceDetails,reasonReject } = req.body;
    // console.log(req.body);
    const lead = await LeadModel.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    res.json({
      success: true,
      message: "Lead Updated Successfully",
      data:lead,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
const searchLead = async (req, res) => {
  try {
    const lead = await LeadModel.findById(req.params.id)
      .populate("businessType")
      .populate("assignBranch")
      .populate("leadSource")
      .populate("status")

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const LeadEdit = async (req, res) => {
  try {
    const lead = await LeadModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Lead Updated Successfully",
      data: lead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const BranchheadLead= async (req, res) => {
    const UserId=req.body.userId;
    try {

        const user = await UserModel.findById({_id:UserId}).populate("userType");
        if(!user){
          return res.json({message:"User in not fount "})
        }
        const leads = await LeadModel.find({
         assignBranchHead: user._id
        }) .populate("businessType").populate("assignBranch").populate("leadSource").populate("status").populate("assignedUser").populate("assignedExecutive").populate("assignBranchHead");
        res.json({
            success: true,
            data: leads
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
const ExcutiveLead= async (req, res) => {
  const UserId=req.body.userId;
  try {

    const user = await UserModel.findById({_id:UserId}).populate("userType");
    if(!user){
      return res.json({message:"User in not fount "})
    }
    const leads = await LeadModel.find({
     assignedExecutive: user._id
    }) .populate("businessType").populate("assignBranch").populate("leadSource").populate("status").populate("assignedUser").populate("assignedExecutive").populate("assignBranchHead");
    res.json({
        success: true,
        data: leads
    });

  } catch (err) {

    res.status(500).json({
        success: false,
        message: err.message
    });

  }


};
const BranchExceutiveLead= async (req, res) => {
    const UserId=req.body.userId;
    try {

        const user = await UserModel.findById({_id:UserId}).populate("userType");
        if(!user){
          return res.json({message:"User in not fount "})
        }
        const leads = await LeadModel.find({
         assignedExecutive: user._id
        }) .populate("businessType").populate("assignBranch").populate("leadSource").populate("status");
        res.json({
            success: true,
            data: leads
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
const assignExecutive = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedExecutive } = req.body;

    const lead = await LeadModel.findByIdAndUpdate(
      id,
      {
        assignedExecutive,
      },
      { returnDocument: "after", }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead Not Found",
      });
    }

    // console.log("Lead Updated:", lead);

    // Executive assigned notification
    if (assignedExecutive) {
      global.io.emit("executiveNotification", {
        executiveId: assignedExecutive,
        leadId: lead._id,
        companyName: lead.companyName,
        contactPerson: lead.contactPerson,
        mobile: lead.mobile,
        message: "New Lead Assigned",
      });
    }

    // Update all connected clients
    global.io.emit("leadUpdated");

    return res.status(200).json({
      success: true,
      message: "Executive Assigned Successfully",
      data: lead,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateLeadstatus = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      status,
      remarks,
      software,
      nextDemoDate,
      demoRemarks,
      rescheduledDate,
      license,
      softwareName,
      installationDate,
      
    } = req.body;
    console.log(req.body)
    // Update Lead
    const updatedLead = await LeadModel.findByIdAndUpdate(
      id,
      {
        status,
        remarks,
        Software: software,
        // ifCallLater: rescheduledDate,
        demoRemarks:demoRemarks,
        rescheduledDate:rescheduledDate,
        nextDemoDate:nextDemoDate
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead Not Found",
      });
    }
    // console.log(updatedLead)

    let newLicense = null;

    // Find selected status
    const statusData = await LeadstatusModel.findById(status);

    // If Status = Yes, create License
    if (statusData && statusData.name === "Success") {
      newLicense = await InsulationModel.create({
        leadId: updatedLead._id,
        companyName: updatedLead.companyName,
        mobile: updatedLead.mobile,
        licenseId: license,
        softwareName,
        installationDate,
      });
    }

    // Update all connected clients
    global.io.emit("leadUpdated"); 

    return res.status(200).json({
      success: true,
      message: "Lead Updated Successfully",
      data: updatedLead,
      license: newLicense,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Leaddelete = async (req, res) => {
  const{isActive}=req.body
  // console.log(req.body)
  try {
    await LeadModel.findByIdAndUpdate(
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
const searchLeadExcutive = async (req, res) => {
  try {
    const { mobile, contactPerson, licenseNo, tokenNo } = req.body;
// console.log(req.body)
    let query = {};

    if (mobile) {
      query.mobile = mobile;
    } else if (contactPerson) {
      query.contactPerson = {
        $regex: contactPerson,
        $options: "i",
      };
    } else if (licenseNo) {
      query.licenseNo = licenseNo;
    } else if (tokenNo) {
      query.tokenNo = tokenNo;
    }

    const lead = await LeadModel.findOne(query)
      .populate("leadSource")
      .populate("status")
      .populate("businessType")
      .populate("assignBranch");

    if (!lead) {
      return res.status(404).json({
        message: "Lead Not Found",
      });
    }


    res.status(200).json({
      success: true,
      message: " Successfully",
      data: lead,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const OwnLeadinsulation = async (req, res) => {
  try {
    const {
      mobile,
      status,
      contactPerson,
      companyName,
      remarks,
      emailId,
      address,
      businessType,
      software,
      district,
      city,
      leadSource,
      priority,
      demoDate,
      referenceDetails,
      license,
      softwareName,
      installationDate,
    } = req.body;

    const UserId = req.body.userId;

    // =====================================
    // 1. Find User using userId
    // =====================================

    const user = await UserModel.findById(UserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // User belongs to which branch?
    const assignBranch = user.branch;

    console.log("User ID:", user._id);
    console.log("User Branch:", assignBranch);

    if (!assignBranch) {
      return res.status(400).json({
        success: false,
        message: "User branch not assigned",
      });
    }

    // =====================================
    // 2. Find Branch Head Role
    // =====================================

    const RoleHead = await RoleModel.findOne({
      roleName: "Branch Head",
    });

    if (!RoleHead) {
      return res.status(404).json({
        success: false,
        message: "Branch Head role not found",
      });
    }

    // =====================================
    // 3. Find Branch Head of User's Branch
    // =====================================

    const branchHead = await UserModel.findOne({
      branch: assignBranch,
      userType: RoleHead._id,
    });

    if (!branchHead) {
      return res.status(404).json({
        success: false,
        message: "No Branch Head found for this branch",
      });
    }

    const branchHeadId = branchHead._id;

    console.log("Branch Head ID:", branchHeadId);

    // =====================================
    // 4. Create Lead
    // =====================================

    const updatedLead = await LeadModel.create({
      mobile,
      status,
      contactPerson,
      companyName,
      remarks,
      emailId,
      address,
      businessType,
      software,
      Software: software,
      district,
      city,

      // Automatically take user's branch
      assignBranch: assignBranch,

      leadSource,
      priority,
      demoDate,
      referenceDetails,

      // User who created the lead
      assignedUser: UserId,

      // Assign same user as executive
      assignedExecutive: UserId,

      // Branch Head of that branch
      assignBranchHead: branchHeadId,
    });

    // =====================================
    // 5. Find Status
    // =====================================

    const statusData = await LeadstatusModel.findById(status);

    let newLicense = null;

    // =====================================
    // 6. Create License only for Success
    // =====================================

    if (statusData && statusData.name === "Success") {

      if (!license || !softwareName || !installationDate) {
        return res.status(400).json({
          success: false,
          message:
            "License ID, Software Name and Installation Date are required for Success status",
        });
      }

      newLicense = await InsulationModel.create({
        leadId: updatedLead._id,
        companyName: updatedLead.companyName,
        mobile: updatedLead.mobile,
        licenseId: license,
        address:updatedLead.address,
        softwareName,
        installationDate,
      });
    }

    // =====================================
    // 7. Socket Notification
    // =====================================

    if (global.io) {
      global.io.emit("leadUpdated");
    }

    // =====================================
    // 8. Response
    // =====================================

     res.status(200).json({
      success: true,
      message: "Lead Created Successfully",

      data: updatedLead,

      license: newLicense,
    });

  } catch (error) {

    console.error("OwnLeadinsulation Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateLeadEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      leadSource,
      contactPerson,
      mobile,
      altMobile,
      companyName,
      businessType,
      location,
      demoDate,
      remarks,
      status,
      assignBranch,
      priority,
      address,
      // preferredLanguage,
      city,
      district,
      software,
    } = req.body;

    // Only actual DB fields
    const updateData = {};

    // Empty values should NOT be updated
    if (leadSource) {
      updateData.leadSource = leadSource;
    }

    if (contactPerson) {
      updateData.contactPerson = contactPerson;
    }

    if (mobile) {
      updateData.mobile = mobile;
    }

    if (altMobile) {
      updateData.alternateContactNo = altMobile;
    }

    if (companyName) {
      updateData.companyName = companyName;
    }

    if (businessType) {
      updateData.businessType = businessType;
    }

    if (location) {
      updateData.location = location;
    }

    if (demoDate) {
      updateData.demoDate = demoDate;
    }

    if (remarks) {
      updateData.remarks = remarks;
    }

    if (status) {
      updateData.status = status;
    }

    if (assignBranch) {
      updateData.assignBranch = assignBranch;
    }

    if (priority) {
      updateData.priority = priority;
    }

    if (address) {
      updateData.address = address;
    }

    if (city) {
      updateData.city = city;
    }

    if (district) {
      updateData.district = district;
    }

    if (software) {
      updateData.software = software;
    }
    // =====================================================
    // UPDATE DATABASE
    // =====================================================

    const updatedLead =
      await LeadModel.findByIdAndUpdate(
        id,
        {
          $set: updateData,
        },
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: updatedLead,
    });

  } catch (error) {
    console.log(
      "Update Lead Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lead update failed",
      error: error.message,
    });
  }
};


module.exports = {
  getLeadByCalledMobileNumber,
  createLead,
  BranchExceutiveLead,
  updateCreatLead,
  updateLeadEdit,
  getLeads,
  updateLead,
  searchLead,
  BranchheadLead,
  Leaddelete,
  LeadEdit,
  assignExecutive,
  updateLeadstatus,
  OwnLeadinsulation,
  ExcutiveLead,
  updateLeadREayleadupdate,
  searchLeadExcutive
};