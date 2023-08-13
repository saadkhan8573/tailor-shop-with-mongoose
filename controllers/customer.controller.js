import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { getProfileAndUserDto } from "../utils/getProfileAndUserDto.js";
import { userService } from "../services/users.service.js";
import { customerService } from "../services/customer.service.js";

const router = express.Router();

router.route("/").post(
  errorHandler(async (req, res) => {
    const { profileDto, userDto } = getProfileAndUserDto(req.body);

    const user = await userService.createUser(userDto);

    if (user) {
      const customer = await customerService.createCustomer({
        ...profileDto,
        user: user.id,
      });

      user.customer = customer;
      user.save();

      res.status(200).send(customer);
    }
  })
);

router.route("/").get(
  errorHandler(async (req, res) => {
    const customers = await customerService.findAllCustomers();
    res.status(200).send(customers);
  })
);

export default router;
