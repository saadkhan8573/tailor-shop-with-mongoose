import WorkDetailModel from "../models/workDetail.model.js";

const getAllWorkDetails = async () => {
  const workDetail = await WorkDetailModel.find()
    .populate("tailor")
    .populate("dressCutter");

  return workDetail;
};

const findWorkDetailByTailorIdAndDressCutterId = async (
  tailorId,
  dressCutterId
) => {
  const workDetail = await WorkDetailModel.findOne({
    tailor: tailorId,
    dressCutter: dressCutterId,
  })
    .populate("tailor")
    .populate("dressCutter");

  return workDetail;
};

export const WorkDetail = {
  getAllWorkDetails,
  findWorkDetailByTailorIdAndDressCutterId,
};
