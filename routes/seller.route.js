import express from "express";
import { body } from "express-validator";

import { myorder, productList, saveProduct, signin, signup, updateProduct ,} from "../controller/seller.controller.js";

const router = express.Router();


router.post("/updateProduct", updateProduct)
router.get("/productList", productList)
router.get("/viewOrders", myorder)


router.post("/signup",body("sellerName","Enter name").notEmpty(),
body("sellerEmail","Invalid Email").isEmail(),body("sellerContact").isNumeric(),
body("sellerPassword","enter password").notEmpty(),
signup);
router.post("/signin",signin);
router.post("/saveproduct",saveProduct);

export default router;