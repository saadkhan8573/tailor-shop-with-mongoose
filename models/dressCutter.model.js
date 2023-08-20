import mongoose from "mongoose";
import validator from "validator";

const DressCutterModel = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "At least 1 skill is required."],
      ref: "DressType",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default mongoose.model("DressCutter", DressCutterModel);
