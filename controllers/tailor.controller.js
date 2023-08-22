import express from "express";
import { token } from "../utils/token.js";
import { errorHandler } from "../utils/errorHandler.js";
import { mailService } from "../services/mail.service.js";
import { userService } from "../services/users.service.js";
import { tailorService } from "../services/tailor.service.js";
import { getProfileAndUserDto } from "../utils/getProfileAndUserDto.js";
import { BadRequestError } from "../utils/error.js";

const router = express.Router();

router.route("/").post(
  errorHandler(async (req, res) => {
    const { userDto, profileDto } = getProfileAndUserDto(req.body);

    // const existUser = await userService.findUserByEmail(userDto.email);

    // if (existUser) {
    //   return res.status(400).send(new BadRequestError("Email Already Exist"));
    // }

    const user = await userService.createUser(userDto);

    if (user) {
      const tailor = await tailorService.createTailor({
        ...profileDto,
        user: user.id,
      });
      user.tailor = tailor;

      await user.save();

      if (tailor) {
        await mailService.sendMail({
          to: user?.email,
          subject: "Testing",
          text: "Saad Khan",
        });
      }
      res.status(201).send(tailor);
    }
  })
);

router.route("/").get(
  token.getUserFromToken,

  errorHandler(async (req, res) => {
    const tailors = await tailorService.getAllTailors();

    res.status(200).send(tailors);
  })
);

router.route("/filtered/list").get(
  token.getUserFromToken,
  errorHandler(async (req, res) => {
    const tailor = await tailorService.getFilteredTailorList(req.query.search);
    res.status(200).send(tailor);
  })
);

router.route("/profile/me").get(
  token.getUserFromToken,
  errorHandler(async (req, res) => {
    const tailor = await tailorService.getTailorProfile(req.user._id);

    if (!tailor) {
      return res.status(400).send(new BadRequestError("Tailor Not Found!"));
    }
    // console.log("Saad", req.user);
    res.status(200).send(tailor);
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
