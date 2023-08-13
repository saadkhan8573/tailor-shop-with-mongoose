import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { userService } from "../services/users.service.js";
import { tailorService } from "../services/tailor.service.js";
import { getProfileAndUserDto } from "../utils/getProfileAndUserDto.js";

const router = express.Router();

router.route("/").post(
  errorHandler(async (req, res) => {
    const { userDto, profileDto } = getProfileAndUserDto(req.body);
    const user = await userService.createUser(userDto);

    if (user) {
      const tailor = await tailorService.createTailor({
        ...profileDto,
        user: user.id,
      });
      user.tailor = tailor;
      await user.save();
      res.status(201).send(tailor);
    }
  })
);

router.route("/").get(
  errorHandler(async (req, res) => {
    const tailors = await tailorService.getAllTailors();

    res.status(200).send(tailors);
  })
);

router.route("/:id").get(
  errorHandler(async (req, res) => {
    const tailor = await tailorService.getTailor(req.params.id);
    res.status(200).send(tailor);
  })
);

router.route("/:id").delete(
  errorHandler(async (req, res) => {
    const tailor = await tailorService.removeTailor(req.params.id);
    res.status(200).send(tailor);
  })
);

export default router;
