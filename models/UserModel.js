// const mongoose = require("mongoose");
import mongoose from "mongoose";

const roles = {
  Admin: "admin",
  Dayer: "dayer",
  Tailor: "tailor",
  Sticher: "sticher",
  Customer: "customer",
  Embroider: "embroider",
  DressCutter: "dressCutter",
};

const status = {
  Pending: "pending",
  Blocked: "blocked",
  Approved: "approved",
  Rejected: "rejected",
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: Object.values(roles),
      default: roles.Admin,
    },
    status: {
      type: String,
      required: [true, "Type is required"],
      enum: Object.values(status),
      default: status.Pending,
    },
    tailor: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Tailor",
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model("User", userSchema);
// module.exports = UserSchema;
export default mongoose.model("User", UserSchema);
