import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { getProfileAndUserDto } from "../utils/getProfileAndUserDto.js";
import { userService } from "../services/users.service.js";
import { dressCutterService } from "../services/dressCutter.service.js";
import { BadRequestError } from "../utils/error.js";
import { tailorService } from "../services/tailor.service.js";
import { token } from "../utils/token.js";
import { WorkDetail } from "../services/wordDetail.service.js";

const router = express.Router();

router.route("/").post(
  errorHandler(async (req, res) => {
    const { userDto, profileDto } = getProfileAndUserDto(req.body);

    const user = await userService.createUser(userDto);

    // const skills = req.body.skills.map((skill) => ({ _id: skill }));

    if (user) {
      const dressCutter = await dressCutterService.createDressCutter({
        ...profileDto,
        user: user.id,
      });

      // if(dressCutter){
      //   dressCutter.skills =
      // }

      user.dressCutter = dressCutter;
      user.save();
      dressCutter.validate();
      res.status(201).send(dressCutter);
    }
  })
);

router.route("/").get(
  errorHandler(async (req, res) => {
    const dressCutter = await dressCutterService.getDressCutterList();

    if (!dressCutter) {
      return res
        .status(400)
        .send(new BadRequestError("Dress Cutters Not Found!"));
    }
    res.status(200).send(dressCutter);
  })
);

router.route("/send-request-workplace/tailor").post(
  token.getUserFromToken,
  errorHandler(async (req, res) => {
    if (!req.body.tailor) {
      return res.status(400).send(new BadRequestError("Tailor is Required!"));
    }

    const tailor = await tailorService.getTailor(req.body.tailor);

    if (!tailor) {
      return res.status(400).send(new BadRequestError("Tailor Not Found!"));
    }

    const dressCutter = await dressCutterService.findDressCutterWithUserId(
      req.user._id
    );

    if (!dressCutter) {
      return res
        .status(400)
        .send(new BadRequestError("DressCutter Not Found!"));
    }

    const getWorkDetail =
      await WorkDetail.findWorkDetailByTailorIdAndDressCutterId(
        tailor._id,
        dressCutter._id
      );

    if (getWorkDetail) {
      return res
        .status(400)
        .send(new BadRequestError("Request already sent to tailor!"));
    }

    const workDetail = await dressCutterService.sendWorkDetailRequestToTailor(
      tailor,
      dressCutter
    );

    res.status(201).send(workDetail);
  })
);

export default router;
