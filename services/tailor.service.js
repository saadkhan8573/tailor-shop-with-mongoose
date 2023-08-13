import TailorModal from "../models/tailorModal.js";

const createTailor = async (tailorDto) => {
  const tailor = new TailorModal(tailorDto);

  return await tailor.save();
};

const getAllTailors = async () => {
  const tailors = TailorModal.find().populate("user").exec();
  return tailors;
};

const getTailor = async (id) => {
  const tailor = await TailorModal.findOne({ _id: id }).populate("user");
  return tailor;
};

const removeTailor = async (id) => {
  const tailor = await TailorModal.findByIdAndRemove(id);
  return tailor;
};

export const tailorService = {
  createTailor,
  getAllTailors,
  getTailor,
  removeTailor,
};
