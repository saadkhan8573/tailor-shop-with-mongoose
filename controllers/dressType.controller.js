import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { dressTypeService } from "../services/dressType.service.js";

const router = express.Router();

router.route("/").post(
  errorHandler(async (req, res) => {
    const dressType = await dressTypeService.addMultiDressTypes(req.body);

    res.status(201).send(dressType);
  })
);

router.route("/").get(
  errorHandler(async (req, res) => {
    const dressTypes = await dressTypeService.findAllDressTypes();

    res.status(200).send(dressTypes);
  })
);

export default router;
