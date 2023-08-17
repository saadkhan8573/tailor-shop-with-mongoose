import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { userService } from "../services/users.service.js";
import { BadRequestError } from "../utils/error.js";
import bcrypt from "bcrypt";
import { token } from "../utils/token.js";

const router = express.Router();

router.route("/login").post(
  errorHandler(async (req, res, next) => {
    const { email, password: passwordField } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.send(new BadRequestError("User Not found"));
    }

    const comparePassword = await bcrypt.compare(passwordField, user.password);
    if (!comparePassword) {
      return res.send(new BadRequestError("User Not found!"));
    }

    const { password, ...rest } = user._doc;
    const tokenData = await token.generateToken(rest);
    rest.access_token = tokenData;
    res.send(rest);
  })
);

export default router;
