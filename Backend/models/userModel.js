import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: { type: String, default: null },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
