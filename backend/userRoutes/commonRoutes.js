const express = require("express");
const { ViewAllBanner } = require("../adminControlls/adminControlls");
const { verifyToken } = require("../middlewares/jwtTokenverification");
const router = express.Router();
const {addToCart,getCartProduct,removeProductFromCart}=require('../usercontrolls/cartControlls');
const { route } = require("./authuserRoutes");


router.route("/view-all-banner").get(ViewAllBanner)


module.exports = router;