const mongoose = require("mongoose");

const SalecellSchema = new mongoose.Schema(
  {
    LeadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_Insulation",
      required: true,
    },
     CustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_Lead",
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_User",
    },
    ContactPerson: {
      type: String,
      required: true,
      trim: true,
    },
    ContactNo: {
      type: Number,
      required: true,
      trim: true,
    },
    Service: {
      type: String,
      required: true,
      trim: true,
    },

    Inward: {
      type: String,
      required: true,
      trim: true,
    },

    cellstatus: {
      type: String,
      required: true,
    },
    AssiginedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_User",
      required: true,
    },
    Branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_Branch",
      required: true,
    },
    CellDate: {
      type: String,
      required: true,
    },
    EngineerRemarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CellsModel = mongoose.model(
  "Master_Cells",
  SalecellSchema
);

module.exports= CellsModel;