import express from "express";
import { addToWishlist, viewWishList, removeFromWishlist } from "../controller/wishlist.controller.js";

const router = express.Router();

router.post("/add-to-wishlist", addToWishlist);
router.get("/viewWishList", viewWishList);
router.post("/delete", removeFromWishlist)

export default router;