import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// routes
import aurh from "./controllers/auth.controller.js";
import user from "./controllers/user.controller.js";
import dress from "./controllers/dress.controller.js";
import tailor from "./controllers/tailor.controller.js";
import customer from "./controllers/customer.controller.js";
import dressType from "./controllers/dressType.controller.js";
import workDetail from "./controllers/wordDetail.controller.js";
import dressCutter from "./controllers/dressCutter.controller.js";

import { databaseConnextion } from "./utils/databaseConnection.js";
import { BadRequestError } from "./utils/error.js";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const errorHandler = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    return res.status(400).send(new BadRequestError(message));
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} Already exist`;
    return res.status(400).send(new BadRequestError(message));
  }

  if (err.name === "StrictPopulateError") {
    const message = `Cannot populate path ${err.path}`;
    return res.status(400).send(new BadRequestError(message));
  }
};

databaseConnextion();

const port = 8003;

app.use("/tailor", tailor);
app.use("/dresscutter", dressCutter);
app.use("/customer", customer);
app.use("/dresstype", dressType);
app.use("/dress", dress);
app.use("/user", user);
app.use("/auth", aurh);
app.use("/workdetail", workDetail);

app.use(errorHandler);
app.listen(port, () => {
  console.log("Project is running");
});
