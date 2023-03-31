import express from "express";
import { SignIn, SignUp } from "../controller/customer.controller.js";
import { body } from "express-validator";
import { getProductByCategory, getProductByPk, list, search, searchByKeyword } from "../controller/product.controller.js";



const router = express.Router();
router.post("/signin", SignIn)
router.post("/signup",
    body("customerName").notEmpty(),
    body("customerEmail", "Not valid email Id").isEmail(),
    body("customerPassword", "Please enter password").notEmpty(),
    body("customerContact", "Only digit is allowed").isNumeric(),
    body("customerPassword", "password must have 5 latter at least").isLength({ min: 5 }),
    SignUp);
router.get("/list", list);
router.get("/getProducts/:categoryName", getProductByCategory);
router.get("/getProductlist/:id", getProductByPk);
router.post("/search/:letter", search);
router.post("/searchKeyword/:keyword", searchByKeyword);
// router.post("/add-to-cart", addToCart)

export default router;
