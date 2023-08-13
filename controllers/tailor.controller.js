import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { createUser } from "../services/users.service.js";
import {
  createTailor,
  getAllTailors,
  getTailor,
  removeTailor,
} from "../services/tailor.service.js";

const router = express.Router();

router.route("/").post(
  errorHandler(async (req, res) => {
    const {
      name,
      email,
      password,
      username,
      status,
      role,
      phone,
      address,
      dob,
      gender,
      zip,
      state,
    } = req.body;
    const userDto = {
      name,
      email,
      password,
      username,
      status,
      role,
    };

    const tailorDto = {
      phone,
      address,
      dob,
      gender,
      zip,
      state,
    };

    const user = await createUser(userDto);

    if (user) {
      const tailor = await createTailor({ ...tailorDto, user: user.id });
      user.tailor = tailor;
      await user.save();
      res.status(201).send(tailor);
    }
  })
);

router.route("/").get(
  errorHandler(async (req, res) => {
    const tailors = await getAllTailors();

    res.status(200).send(tailors);
  })
);

router.route("/:id").get(
  errorHandler(async (req, res) => {
    const tailor = await getTailor(req.params.id);
    res.status(200).send(tailor);
  })
);

router.route("/:id").delete(
  errorHandler(async (req, res) => {
    const tailor = await removeTailor(req.params.id);
    res.status(200).send(tailor);
  })
);

export default router;
