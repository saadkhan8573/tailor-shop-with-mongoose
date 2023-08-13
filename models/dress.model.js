import mongoose, { mongo } from "mongoose";
import { DressStatusEnum, PriorityEnum } from "../enums/dress.enum.js";

const dressModel = new mongoose.Schema({
  dressType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "DressType",
  },
  priority: {
    type: String,
    enum: Object.values(PriorityEnum),
    default: PriorityEnum.Low,
  },
  status: {
    type: String,
    enum: Object.values(DressStatusEnum),
    default: DressStatusEnum.Incomplete,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  tailor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tailor",
  },
});

export default mongoose.model("Dress", dressModel);
