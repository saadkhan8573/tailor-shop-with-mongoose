import mongoose from "mongoose";

const dressTypeModel = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: [true, "Type must be unique"],
  },
  dress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dress",
    },
  ],
});

export default mongoose.model("DressType", dressTypeModel);
