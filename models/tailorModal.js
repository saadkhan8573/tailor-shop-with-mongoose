import mongoose from "mongoose";

const TailorModal = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  dob: { type: Date, required: true },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default mongoose.model("Tailor", TailorModal);
