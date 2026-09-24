const crypto = require("crypto");
const nodemailer = require("nodemailer");
const UserModel = require("../models/user.model");
const bcrypt=require("bcrypt");
require("dotenv").config();
const PasswordResetModel = require("../models/PasswordResetModel");
const forgotPassword = async (req, res) => {
  try {
    const { Email } = req.body;

    // 1. Email check
    if (!Email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }
    const email = Email.trim().toLowerCase();
    // 2. Find user
    const user = await UserModel.findOne({
      Email: email
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 3. Generate secure random token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // 4. Token expiry - 15 minutes
    const expiresAt = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // 5. Remove old reset token if exists
    await PasswordResetModel.deleteMany({
      userId: user._id
    });

    // 6. Save new reset token
    await PasswordResetModel.create({
      userId: user._id,
      token: resetToken,
      expiresAt: expiresAt
    });

    // 7. Create reset URL
    const resetUrl =
      `${process.env.Backend_url}/reset-password/${resetToken}`;

    // 8. NodeMailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 9. Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.Email,
      subject: "Reset Your Password",

      html: `
        <h2>Password Reset</h2>

        <p>Hello ${user.username},</p>

        <p>
          You requested to reset your password.
        </p>

        <p>
          Click the button below to reset your password:
        </p>

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            padding:10px 20px;
            background:#2563eb;
            color:white;
            text-decoration:none;
            border-radius:5px;
          "
        >
          Reset Password
        </a>

        <p>
          This link will expire in 15 minutes.
        </p>

        <p>
          If you did not request this, please ignore this email.
        </p>
      `
    });

    // 10. Success response
    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email"
    });

  } catch (error) {

    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

const resetPassword = async (req, res) => {
  try {

    // 1. Get token from URL
    const { token } = req.params;

    // 2. Get new password from request body
    const { password } = req.body;

    // 3. Check password
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required"
      });
    }

    // 4. Find reset token
    const resetData = await PasswordResetModel.findOne({
      token: token
    });

    if (!resetData) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link"
      });
    }

    // 5. Check token expiry
    if (resetData.expiresAt < new Date()) {

      // Delete expired token
      await PasswordResetModel.deleteOne({
        _id: resetData._id
      });

      return res.status(400).json({
        success: false,
        message: "Reset link has expired"
      });
    }

    // 6. Find user
    const user = await UserModel.findById(
      resetData.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 7. Hash new password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // 8. Update password
    user.password = hashedPassword;

    await user.save();

    // 9. Delete reset token
    await PasswordResetModel.deleteOne({
      _id: resetData._id
    });

    // 10. Success
    return res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {

    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

module.exports = {
  forgotPassword,
  resetPassword
};