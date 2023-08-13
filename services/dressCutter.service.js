import dressCutterModel from "../models/dressCutter.model.js";

const createDressCutter = async (dressCutterDto) => {
  const dressCutter = new dressCutterModel(dressCutterDto);

  return await dressCutter.save();
};

export const dressCutterService = {
  createDressCutter,
};
