import mongoose from "mongoose";

const loanRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  downPayment: { type: Number, required: false },
  loanPeriod: { type: String, required: true },
  emi: { type: Number, required: true },
  processingFee: { type: Number, required: true },
  totalRepayable: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

const loanRequestModel = mongoose.model("LoanRequest", loanRequestSchema);

export default loanRequestModel;
