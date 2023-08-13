import TailorModal from "../models/tailorModal.js";

export const createTailor = async (tailorDto) => {
  const tailor = new TailorModal(tailorDto);

  return await tailor.save();
};

export const getAllTailors = async () => {
  const tailors = TailorModal.find().populate("user");
  return tailors;
};

export const getTailor = async (id) => {
  const tailor = await TailorModal.findOne({ _id: id }).populate("user");
  return tailor;
};

export const removeTailor = async (id) => {
  const tailor = await TailorModal.findByIdAndRemove(id);
  return tailor;
};
