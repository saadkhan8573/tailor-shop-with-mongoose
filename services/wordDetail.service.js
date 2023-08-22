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

const getAllDressCutterWorkDetail = async (dressCutterId) => {
  try {
    const workDetail = await WorkDetailModel.find({
      dressCutter: dressCutterId,
    })
      .populate({
        path: "dressCutter",
        populate: {
          path: "user", // Assuming the user reference field is named "user"
          model: "User", // Replace with the actual model name for the User collection
        },
      })
      .populate({
        path: "tailor",
        populate: {
          path: "user",
        },
      });

    return workDetail;
  } catch (err) {
    console.log(err);
  }
};

export const WorkDetail = {
  getAllWorkDetails,
  getAllDressCutterWorkDetail,
  findWorkDetailByTailorIdAndDressCutterId,
};
