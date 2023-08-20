import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { userService } from "../services/users.service.js";
import { BadRequestError } from "../utils/error.js";

const router = express.Router();

router.route("/").post(
  errorHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  })
);

router.route("/").get(
  errorHandler(async (req, res) => {
    const users = await userService.getUsers();

    res.status(200).send(users);
  })
);

export default router;
