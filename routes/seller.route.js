import express from "express";
import { body } from "express-validator";

import { signin, signup, updateProduct, } from "../controller/seller.controller.js";
import { saveProduct, list, removeProduct, searchByKeyword } from "../controller/product.controller.js";

const router = express.Router();


router.post("/updateProduct", updateProduct)

router.get("/productList", list)
router.post("/signup", body("sellerName", "Enter name").notEmpty(),
    body("sellerEmail", "Invalid Email").isEmail(), body("sellerContact").isNumeric(),
    body("sellerPassword", "enter password").notEmpty(), signup);
router.post("/signin", signin);
router.post("/saveproduct", saveProduct);
router.post("/deleteproduct/:productid", removeProduct);
router.post("/searchKeyword/:keyword", searchByKeyword);



export default router;