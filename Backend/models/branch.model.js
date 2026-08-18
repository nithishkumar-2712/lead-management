const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  address: {
    type: String
  },

  phone: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

const BranchModel = mongoose.model("Master_Branch", branchSchema);
module.exports=BranchModel