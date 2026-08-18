const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Master_Role",
    required: true
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

    branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Master_Branch",
    required: true
  },

  password: {
    type: String,
    required: true,
    minlength: 4
  },
  Email :{
    type: String,
  },
  Number :{
    type: Number,
  },


  isBlocked: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

 const UserModel= mongoose.model("Master_User", userSchema);
 module.exports= UserModel;