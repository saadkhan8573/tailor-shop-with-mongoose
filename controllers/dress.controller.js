import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { BadRequestError } from "../utils/error.js";
import { dressTypeService } from "../services/dressType.service.js";
import { customerService } from "../services/customer.service.js";
import { dressService } from "../services/dress.service.js";

const router = express.Router();

router.route("/").post(
  errorHandler(async (req, res, next) => {
    if (!req.body.customer) {
      return res.send(new BadRequestError("Customer is required!"));
    }

    if (!req.body.dressType) {
      return res.send(new BadRequestError("DressType is required!"));
    }

    const dressType = await dressTypeService.findDressType(req.body.dressType);

    if (!dressType) {
      return res.send(new BadRequestError("Dresstype not found!"));
    }

    const customer = await customerService.findCustomer(req.body.customer);
    if (!customer) {
      return res.send(new BadRequestError("Customer not found!"));
    }

    const dress = await dressService.createDress(req.body);
    dress.customer = customer;
    dress.dressType = dressType;

    dress.save();

    dressType.dress.push(dress.id);
    dressType.save();
    res.send(dress);
  })
);

router.route("/").get(
  errorHandler(async (req, res) => {
    const dress = await dressService.findAllDress();
    res.status(200).send(dress);
  })
);

export default router;
