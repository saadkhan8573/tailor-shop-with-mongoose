import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// routes
import user from "./controllers/user.controller.js";
import dress from "./controllers/dress.controller.js";
import tailor from "./controllers/tailor.controller.js";
import customer from "./controllers/customer.controller.js";
import dressType from "./controllers/dressType.controller.js";
import dressCutter from "./controllers/dressCutter.controller.js";

import { databaseConnextion } from "./utils/databaseConnection.js";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

databaseConnextion();

const port = 8003;

app.use("/tailor", tailor);
app.use("/dresscutter", dressCutter);
app.use("/customer", customer);
app.use("/dresstype", dressType);
app.use("/dress", dress);
app.use("/user", user);

app.listen(port, () => {
  console.log("Project is running");
});
