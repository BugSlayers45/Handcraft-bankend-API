import express from "express";
const router = express.Router();
import { saveOrder, viewOrderdetail } from "../controller/order.controller.js";

router.post("/saveOrder", saveOrder);
router.get("/viewOrderdetail", viewOrderdetail);


export default router;

