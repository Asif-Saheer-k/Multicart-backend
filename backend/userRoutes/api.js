const express = require("express");
const router = express.Router();
const cartRoutes=require("./cartRoutes")
const wishlistRoutes=require("./wishlistRoutes")
const commonRoutes=require("./commonRoutes")
const orderRoutes=require("./orderRoutes")
const adminRoutes=require("./adminRoutes")


router.route("/user/cart",cartRoutes)
router.route("/user/wishlist",wishlistRoutes)
router.route("/user/main",commonRoutes)
router.route("/user/order",orderRoutes)
router.route("/admin",adminRoutes)

module.exports = router;
