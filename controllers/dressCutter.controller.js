import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { getProfileAndUserDto } from "../utils/getProfileAndUserDto.js";
import { userService } from "../services/users.service.js";
import { dressCutterService } from "../services/dressCutter.service.js";
import { BadRequestError } from "../utils/error.js";
import { tailorService } from "../services/tailor.service.js";
import { token } from "../utils/token.js";
import { WorkDetail } from "../services/wordDetail.service.js";
import { roles } from "../models/UserModel.js";

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

      // if(dressCutter){
      //   dressCutter.skills =
      // }

      user.dressCutter = dressCutter;
      user.save();
      dressCutter.validate();
      res.status(201).send(dressCutter);
    }

    // const skills = req.body.skills.map((skill) => ({ _id: skill }));
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

router.route("/profile/me").get(
  token.getUserFromToken,
  token.restrictToRole(roles.DressCutter),
  errorHandler(async (req, res) => {
    const dressCutter = await dressCutterService.dressCutterProfile(
      req.user._id
    );

    if (!dressCutter) {
      return res
        .status(400)
        .send(new BadRequestError("Dress Cutter Not Found!"));
    }

    res.status(200).send(dressCutter?.length > 0 ? dressCutter[0] : {});
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

router.route("/list/my-workdetail").get(
  token.getUserFromToken,
  token.restrictToRole(roles.DressCutter),
  errorHandler(async (req, res) => {
    const user = req.user;
    const dressCutter = await dressCutterService.findDressCutterWithUserId(
      user._id
    );

    if (!dressCutter) {
      return res
        .send(400)
        .status(new BadRequestError("Dress Cutter Not Found!"));
    }

    const workDetail = await WorkDetail.getAllDressCutterWorkDetail(
      dressCutter._id
    );

    res.status(200).send(workDetail);
  })
);

export default router;
