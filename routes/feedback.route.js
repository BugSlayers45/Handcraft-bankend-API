import express from "express";
import { feedback, viewFeedback } from "../controller/feedback.controller.js";
const router = express.Router();

router.post("/addFeedback", feedback);
router.get("/viewfeedback", viewFeedback);

export default router;