const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/jwtTokenverification");

const { addToCart, getCartProduct, removeProductFromCart } = require("../userControls/cartControls");
router.route("/add-to-cart").post(addToCart);
router.route("/get-cart-product/:id").get(getCartProduct);
router.route("/remove-product-form-cart").post(removeProductFromCart);
module.exports = router;
