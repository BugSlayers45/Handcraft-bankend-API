import express from "express";
import { addToCart, cartList, remove } from "../controller/cart.controller.js";

const router = express.Router();

router.post("/add-to-cart", addToCart);
router.get("/cartList", cartList);
router.post("/delete", remove)

export default router;