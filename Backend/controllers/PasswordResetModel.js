const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Master_User",
      required: true
    },

    token: {
      type: String,
      required: true
    },

    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const PasswordResetModel = mongoose.model(
  "PasswordReset",
  passwordResetSchema
);

module.exports = PasswordResetModel;