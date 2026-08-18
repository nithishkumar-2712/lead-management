const mongoose = require("mongoose");

const leadStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

  },
  {
    timestamps: true
  }
);

const LeadstatusModel = mongoose.model("Master_LeadStatus", leadStatusSchema);
module.exports =LeadstatusModel;