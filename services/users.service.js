import UserModel from "../models/UserModel.js";

const createUser = async (userDto) => {
  const user = UserModel.create(userDto);

  return user;
};

const findUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });

  return user;
};

const getUsers = async () => {
  const users = await UserModel.find()
    .populate("tailor")
    .populate("dressCutter")
    .populate("customer");
  return users;
};

export const userService = {
  getUsers,
  createUser,
  findUserByEmail,
};
