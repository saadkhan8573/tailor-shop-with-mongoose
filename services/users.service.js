import UserModel from "../models/UserModel.js";

export const createUser = async (userDto) => {
  const user = UserModel.create(userDto);

  return user;
};
