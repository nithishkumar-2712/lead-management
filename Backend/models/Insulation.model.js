const mongoose = require("mongoose");

const InsulationSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_Lead",
      required: true,
    },

    licenseId: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    address: {
      type: String,
      default: "N/A",
    },

    softwareName: {
      type: String,
      required: true,
      trim: true,
    },

    installationDate: {
      type: Date,
      required: true,
    },
    isActive:{
      type: Boolean,
      default: true
    },
    Reson:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const InsulationModel = mongoose.model(
  "Master_Insulation",
  InsulationSchema
);

module.exports= InsulationModel;
