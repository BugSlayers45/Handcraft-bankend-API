import express from "express"
import { saveAllCategory, saveCategory } from "../controller/category.controller.js";

const router = express.Router();

router.post("/save",saveCategory);
router.post("/saveallcategory",saveAllCategory);

export default router;