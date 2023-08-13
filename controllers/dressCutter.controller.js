import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { getProfileAndUserDto } from "../utils/getProfileAndUserDto.js";
import { userService } from "../services/users.service.js";
import { dressCutterService } from "../services/dressCutter.service.js";

const router = express.Router();

router.route("/").post(
  errorHandler(async (req, res) => {
    const { userDto, profileDto } = getProfileAndUserDto(req.body);

    const user = await userService.createUser(userDto);

    if (user) {
      const dressCutter = await dressCutterService.createDressCutter({
        ...profileDto,
        user: user.id,
      });

      user.dressCutter = dressCutter;
      user.save();

      res.status(201).send(dressCutter);
    }
  })
);

export default router;
