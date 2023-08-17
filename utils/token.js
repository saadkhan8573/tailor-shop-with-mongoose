import jwt from "jsonwebtoken";
import { BadRequestError } from "./error.js";

const generateToken = async (user) => {
  return await jwt.sign(user, process.env.JWTSecret, {
    expiresIn: "1m",
  });
};

const getUserFromToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.send(new BadRequestError("You are not authenticated!"));
  }

  try {
    const user = jwt.verify(token.split(" ")[1], process.env.JWTSecret);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const restrictToRole = (roles) => (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.send(new BadRequestError("Token"));
  }

  try {
    const token = authorization.split(" ")[1];
    const user = jwt.decode(token, process.env.JWTSecret);

    console.log("roles.includes(user.role)", roles.includes(user.role));

    if (roles.includes(user.role)) return next();

    return res.send(new BadRequestError("You are not authenticated!"));
  } catch (err) {
    return next(err);
  }
};

export const token = {
  generateToken,
  restrictToRole,
  getUserFromToken,
};
