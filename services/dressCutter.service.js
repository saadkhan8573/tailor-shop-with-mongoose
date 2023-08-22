import mongoose from "mongoose";
import dressCutterModel from "../models/dressCutter.model.js";
import WorkDetailModel from "../models/workDetail.model.js";

const createDressCutter = async ({ ...dressCutterDto }) => {
  const dressCutter = new dressCutterModel(dressCutterDto);
  // dressCutter.skills = skills;
  return await dressCutter.save();
};

const getDressCutterList = async () => {
  try {
    const dressCutterList = await dressCutterModel
      .find()
      .populate("skills")
      .populate("user")
      .select("-password");
    return dressCutterList;
  } catch (error) {
    throw error;
  }
};

const dressCutterProfile = async (id) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      return false;
    }

    const dressCutter = await dressCutterModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          "user._id": new mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: "$user",
      },
    ]);

    return dressCutter;
  } catch (err) {
    console.log(err);
  }
};

const findDressCutterWithUserId = async (dressCutterUserId) => {
  const dressCutter = await dressCutterModel
    .findOne({
      user: dressCutterUserId,
    })
    .populate("user")
    .exec();

  return dressCutter;
};

const sendWorkDetailRequestToTailor = async (tailor, dressCutter) => {
  const workDetail = new WorkDetailModel();

  workDetail.tailor.push(tailor);
  workDetail.dressCutter.push(dressCutter);

  return await workDetail.save();
};

export const dressCutterService = {
  createDressCutter,
  dressCutterProfile,
  getDressCutterList,
  findDressCutterWithUserId,
  sendWorkDetailRequestToTailor,
};
