import dressModel from "../models/dress.model.js";

const createDress = async (dressDto) => {
  const dress = await dressModel.create(dressDto);
  return dress;
};

const findAllDress = async () => {
  return await dressModel.find().populate("dressType").populate("customer");
};

export const dressService = {
  createDress,
  findAllDress,
};
