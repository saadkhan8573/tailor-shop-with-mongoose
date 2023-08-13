import dressTypeModel from "../models/dressType.model.js";

const addMultiDressTypes = async (dressTypes) => {
  const uniqueDresssType = [
    ...new Set(dressTypes.map((dressType) => dressType.type)),
  ];

  const dressTypeData = uniqueDresssType.map((dressType) => ({
    type: dressType,
  }));

  const findDressTypes = await dressTypeModel.find({
    type: { $in: dressTypeData.map(({ type }) => type) },
  });

  const filterDressTypes = dressTypeData.filter(
    ({ type }) => !findDressTypes.map(({ type }) => type).includes(type)
  );
  const dressType = await dressTypeModel.insertMany(filterDressTypes);

  return await dressType;
};

const findAllDressTypes = async () => {
  const dressTypes = await dressTypeModel.find().populate("dress");
  return dressTypes;
};

const findDressType = async (id) => {
  const dressType = await dressTypeModel.findById(id).populate("dress");
  return dressType;
};

export const dressTypeService = {
  addMultiDressTypes,
  findDressType,
  findAllDressTypes,
};
