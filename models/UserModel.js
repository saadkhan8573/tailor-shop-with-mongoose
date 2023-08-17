// const mongoose = require("mongoose");
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const roles = {
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
      ref: "Tailor",
    },
    dressCutter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DressCutter",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.post("save", function (error, doc, next) {
//   if (error.name === "MongoError" && error.code === "E11000") {
//     next(new Error("email must be unique"));
//   } else {
//     next(error);
//   }
// });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// module.exports = mongoose.model("User", userSchema);
// module.exports = UserSchema;
export default mongoose.model("User", UserSchema);
