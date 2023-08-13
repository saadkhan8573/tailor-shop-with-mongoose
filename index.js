import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// routes
import tailor from "./controllers/tailor.controller.js";
import user from "./controllers/user.controller.js";

import { databaseConnextion } from "./utils/databaseConnection.js";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

databaseConnextion();

const port = 8003;

app.use("/tailor", tailor);
app.use("/user", user);

app.listen(port, () => {
  console.log("Project is running");
});
