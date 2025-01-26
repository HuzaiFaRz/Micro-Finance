import crypto from "crypto";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import sendEmail from "../utils/mailer.js";
import bcrypt from "bcryptjs";
import LoanRequestModel from "../models/loanRequestModel.js";

const register = async (req, res) => {
  try {
    const { cnic, email, name } = req.body;

    const existingUser = await userModel.findOne({ cnic });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this CNIC already exists" });
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const tempPassword = crypto.randomBytes(8).toString("hex");

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newUser = await userModel.create({
      cnic,
      email,
      name,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    try {
      sendEmail(email, tempPassword);
    } catch (err) {
      console.error("Email sending failed:", err);
      return res.status(500).json({
        message:
          "Loan request submitted successfully, but failed to send email. Please try again later.",
      });
    }

    res.status(200).json({
      token,
      newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { cnic, password, newPassword } = req.body;

    const user = await userModel.findOne({ cnic });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const loanRequest = async (req, res) => {
  try {
    const {
      userId,
      category,
      subcategory,
      loanAmount,
      downPayment,
      loanPeriod,
      emi,
      processingFee,
      totalRepayable,
    } = req.body;

    const newLoanRequest = await LoanRequestModel.create({
      userId,
      category,
      subcategory,
      loanAmount,
      downPayment,
      loanPeriod,
      emi,
      processingFee,
      totalRepayable,
    });

    res.status(200).json({ message: "Loan request saved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLoanRequest = async (req, res) => {
  try {
    const { userId } = req.body;

    const loanRequests = await LoanRequestModel.find({ userId });
    console.log(loanRequests);

    if (loanRequests.length === 0) {
      return res
        .status(404)
        .json({ message: "No loan requests found for this user" });
    }

    res.status(200).json({ loanRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export { register, resetPassword, loanRequest, getLoanRequest, getProfile };
