import mongoose from "mongoose";
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

const getFilteredTailorList = async (search) => {
  try {
    const searchedValue = search && search.split(",");

    const filters = {};

    if (searchedValue && searchedValue?.length > 0) {
      searchedValue.forEach((search) => {
        const value = search.split(":");
        filters[value[0]] = value[1];
      });
    }

    const query = {};

    if (filters.name) {
      query["user.name"] = { $regex: filters.name, $options: "i" };
    }

    if (filters.email) {
      query["user.email"] = { $regex: filters.email, $options: "i" };
    }

    const tailors = await TailorModal.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: query,
      },
      {
        $unwind: "$user",
      },
    ]);
    return tailors;
  } catch (err) {
    console.log(err);
  }
};

const getTailorProfile = async (id) => {
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) {
    console.log("Invalid ObjectId:", id);
    return null;
  }
  try {
    const tailor = await TailorModal.aggregate([
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
          "user._id": new mongoose.Types.ObjectId(id), // Convert userId to ObjectId
        },
      },
      {
        $unwind: "$user",
      },
    ]);
    return tailor;
  } catch (err) {
    console.log(err);
  }
};

const removeTailor = async (id) => {
  const tailor = await TailorModal.findByIdAndRemove(id);
  return tailor;
};

export const tailorService = {
  getTailor,
  removeTailor,
  createTailor,
  getAllTailors,
  getTailorProfile,
  getFilteredTailorList,
};
