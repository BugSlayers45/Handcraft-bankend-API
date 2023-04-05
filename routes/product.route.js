import express from "express";
import { getProductByCategory, getProductByPk, list, saveProduct, search, searchByKeyword } from "../controller/product.controller.js";


const router = express.Router();
router.post("/saveproduct", saveProduct);
router.get("/list", list);
router.get("/getProducts/:categoryName", getProductByCategory);
router.get("/getProductlist/:id", getProductByPk);
router.post("/search/:letter", search);
router.post("/searchKeyword/:keyword", searchByKeyword);


export default router;