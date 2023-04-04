import express from "express";
import { SignIn, SignUp } from "../controller/customer.controller.js";
import { body } from "express-validator";

const router = express.Router();
router.post("/signin", SignIn)
router.post("/signup",
    body("customerName").notEmpty(),
    body("customerEmail", "Not valid email Id").isEmail(),
    body("customerPassword", "Please enter password").notEmpty(),
    body("customerContact", "Only digit is allowed").isNumeric(),
    body("customerPassword", "password must have 5 latter at least").isLength({ min: 5 }),
    SignUp);
export default router;
