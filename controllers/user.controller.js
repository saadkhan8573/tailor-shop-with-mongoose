import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { createUser } from "../services/users.service.js";

const router = express.Router();

router.route("/").post(
  errorHandler(async (req, res) => {
    const user = await createUser(req.body);
    console.log(user);
    res.status(201).send(user);
  })
);

export default router;
