import jwt from "jsonwebtoken";
import { BadRequestError } from "./error.js";

const generateToken = async (user) => {
  return await jwt.sign(user, process.env.JWTSecret, {
    expiresIn: "30m",
  });
};

const getUserFromToken = (req, res, next) => {
  const authorization = req.header("Authorization");

  if (!authorization) {
    return res.send(new BadRequestError("You are not authenticated!"));
  }

  const token = authorization.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWTSecret);

    if (!user) {
      return res.send(new BadRequestError("User Not Found!"));
    }
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

    if (roles.includes(user.role)) return next();

    return res.send(
      new BadRequestError("You are not Authorized to access this role!")
    );
  } catch (err) {
    return next(err);
  }
};

export const token = {
  generateToken,
  restrictToRole,
  getUserFromToken,
};
