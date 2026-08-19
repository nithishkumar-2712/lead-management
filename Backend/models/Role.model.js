const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// const RoleModel = mongoose.model("Master_Role", roleSchema);
const RoleModel =mongoose.model("Master_Role", roleSchema);
module.exports=RoleModel;