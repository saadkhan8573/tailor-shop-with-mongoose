import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { WorkDetail } from "../services/wordDetail.service.js";

const router = express.Router();

router.route("/").get(
  errorHandler(async (req, res) => {
    const workDetail = await WorkDetail.getAllWorkDetails();
    res.status(200).send(workDetail);
  })
);

export default router;
