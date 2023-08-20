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
  getDressCutterList,
  findDressCutterWithUserId,
  sendWorkDetailRequestToTailor,
};
