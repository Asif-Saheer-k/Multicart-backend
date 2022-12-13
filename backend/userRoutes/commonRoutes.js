const express = require("express");
const { ViewAllBanner, ViewCategory,viewAllProducts } = require("../adminControlls/adminControlls");
const { verifyToken } = require("../middlewares/jwtTokenverification");
const router = express.Router();
const {addToCart,getCartProduct,removeProductFromCart}=require('../usercontrolls/cartControlls');
const { route } = require("./authuserRoutes");


router.route("/view-all-banner").get(ViewAllBanner)
router.route("/view-all-category").get(ViewCategory);
router.route("/view-all-products").post(viewAllProducts)


module.exports = router;     