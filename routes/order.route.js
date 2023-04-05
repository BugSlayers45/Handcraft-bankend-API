import express from "express";
const router = express.Router();
import { saveOrder } from "../controller/order.controller.js";

router.post("/saveOrder", saveOrder);


export default router;

