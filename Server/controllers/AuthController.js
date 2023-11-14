const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEMail } = require("../utils/emailSender");
const { emailVerificationMessage } = require("../utils/messagesGenerator");

class AuthController {
  static async me(req, res) {
    let email = req.user.email;
    const user = await User.findOne({ email }).populate({
      path: "role",
      select: "name",
    });
    return res.status(200).json({ user });
  }

  static async getUsers(req, res) {
    const users = await User.find()
    return res.status(200).json({users});
  }

  static async login(req, res) {
    let { email, password } = req.body;

    if ((!email, !password)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email is not correct" });
    }

    let passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password is not correct" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      full_name: user.full_name,
      phone_number: user.phone_number,
      address: user.address,
      role: user.role,
      verified: user.verified,
      approved: user.approved,
    };

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
      expiresIn: "7d",
    });
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 900,
    });
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 604800000,
    });
    return res.send({
      message: user.verified
        ? "Verified Account"
        : "You should verify your account, check your email",
    });
  }

  static async logout(req, res) {
    res.cookie("accessToken", "");
    res.cookie("refreshToken", "");
    return res.status(200).json({ message: "logged out" });
  }

  static async verifyEmail(req, res) {
    let user = await User.findOneAndUpdate(
      { email: req.user.email },
      { verified: true },
      { new: true }
    );
    if (user) {
      if (user.verified) {
        return res.status(200).json({ message: "User has been verified" });
      } else {
        return res.status(500).json({ error: "Error while Updating" });
      }
    } else {
      return res.status(404).json({ error: "No user found" });
    }
  }
  static async sendEMailVerification(req, res) {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email field is required" });
    }

    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "There is no user with this email" });
    }
    try {
      sendEMail(
        emailVerificationMessage(existingUser.email, "Email Verification")
      );
    } catch (err) {
      console.log(err);
    }

    res.status(200).json({ message: `Email has been sent , go and check` });
  }
  static async forgetPassword(req, res) {
    let { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email is not correct" });
    }

    sendEMail(emailVerificationMessage(user.email, "Reset Password"));

    res.status(200).json({ message: "Email sent successfully" });
  }

  static async resetPassword(req, res) {
    let user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(500).json({ error: "Error while Updating" });

    const { password, password_confirmation } = req.body;
    if (!password || !password_confirmation)
      return res.status(400).json({ message: "All fields are required" });
    if (password != password_confirmation)
      return res.status(400).json({ message: "Password does not match" });

    user.password = password;
    await user.save();

    return res.status(201).json({ message: "password updated successfully" });
  }
}

module.exports = AuthController;
