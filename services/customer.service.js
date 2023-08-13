import customerModel from "../models/customer.model.js";

const createCustomer = async (customerDto) => {
  const customer = new customerModel(customerDto);

  return await customer.save();
};

const findAllCustomers = async () => {
  return await customerModel.find().populate("user");
};

const findCustomer = async (id) => {
  const customer = customerModel.findOne({ _id: id });
  return customer;
};

export const customerService = {
  createCustomer,
  findCustomer,
  findAllCustomers,
};
