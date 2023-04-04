import express from "express"
import { categoryList, remove, saveAllCategory, saveCategory, update } from "../controller/category.controller.js";

const router = express.Router();

router.post("/save",saveCategory);
router.post("/saveallcategory",saveAllCategory);

router.post("/delete",remove);
router.post("/update",update);
router.get("/categoryList",categoryList);

export default router;