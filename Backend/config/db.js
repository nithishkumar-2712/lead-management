const mongoose = require("mongoose");
require("dotenv").config()
const DBconnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("DB connection Successfully");
  } catch (error) {
    console.log("DB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = DBconnection;