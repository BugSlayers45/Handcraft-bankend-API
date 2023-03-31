import express from "express";
import { signin, signup } from "../controller/admin.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/signup",body("adminName").notEmpty(),
body("adminEmail").isEmail(),
body("adminPassword").notEmpty(),signup);
router.post("/signin",signin);

export default router;