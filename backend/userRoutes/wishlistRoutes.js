const express = require("express");
const { addToWishlist, getWishlistProduct, removeProductFromWishlist } = require("../userControls/WishlistControl");
const router = express.Router();
router.route("/add-to-wishlist").post(addToWishlist);
router.route("/get-wishlist-product/:id").get(getWishlistProduct)
router.route('/remove-product-form-wishlist').post(removeProductFromWishlist)
module.exports = router;   