const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    // 📞 Basic Lead Info
    mobile: {
      type: Number,
      trim: true,
    },

    contactPerson: {
      type: String,
      trim: true,
      default: "N/A",
    },

    companyName: {
      type: String,
      trim: true,
      default: "N/A",
    },

    contactNo: {
      type: String,
      trim: true,
      default: "N/A",
    },

    emailId: {
      type: String,
      trim: true,
      default: "N/A",
    },

    address: {
      type: String,
      default: "N/A",
    },

    remarks: {
      type: String,
    },

    // 🏢 Business Info
    businessType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_BusinessType",
      default: null,
    },

    software: {
      type: String,
    },

    district: {
      type:String,
      default: null,
    },

    city: {
      type:String,
      default: null,
    },

    assignBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_Branch",
      default: null,
    },

    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_User",
      default: null,
    },

    // 📊 Lead Tracking
    leadSource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_LeadSource",
    },

    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_LeadStatus",
    },

    nextDemoDate: {
      type: Date,
      default: null,
    },

    demoDate: {
      type: Date,
      default: null,
    },
    rescheduledDate: {
      type: Date,
      default: null,
    },
    assignedExecutive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_User",
      default: null
    },
    assignBranchHead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_User",
      default: null
    },

    referenceDetails: {
      type: String,
      default: "N/A",
    },

    reasonReject: {
      type: String,
      default: "N/A",
    },
    demoRemarks: {
      type: String,
      default: "N/A",
    },
    
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    
    isActive:{
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
  }
);

const LeadModel = mongoose.model("Master_Lead", leadSchema);

module.exports = LeadModel;