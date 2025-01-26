import express from "express";
import {
  register,
  resetPassword,
  loanRequest,
  getLoanRequest,
  getProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/reset-password", resetPassword);
router.post("/loan-request", loanRequest);
router.post("/get-loan-requests", getLoanRequest);
router.get("/profile", getProfile);

export default router;
