const mongoose = require("mongoose");

const businessTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    description: {
      type: String
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

const BusinessModel = mongoose.model("Master_BusinessType", businessTypeSchema);
module.exports = BusinessModel;