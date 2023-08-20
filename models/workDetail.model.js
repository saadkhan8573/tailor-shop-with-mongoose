import mongoose from "mongoose";

const status = {
  Pending: "pending",
  Approved: "approved",
  Rejected: "rejected",
};

const WorkDetail = mongoose.Schema({
  status: {
    type: String,
    required: [true, "Type is required"],
    enum: Object.values(status),
    default: status.Pending,
  },
  tailor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tailor",
    },
  ],
  dressCutter: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DressCutter",
    },
  ],
});

export default mongoose.model("WorkDetail", WorkDetail);
