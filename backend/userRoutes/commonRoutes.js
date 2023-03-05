const express = require("express");
const { ViewAllBanner, ViewCategory,viewAllProducts, ViewCategoryProducts,ImageUploading } = require("../adminControlls/adminControlls");
const { verifyToken } = require("../middlewares/jwtTokenverification");
const router = express.Router();
const {addToCart,getCartProduct,removeProductFromCart}=require('../usercontrolls/cartControlls');
const { viewSingleProduct,RazorpayIntegration,GetSubCategoryProducts } = require("../usercontrolls/commernControlls");
const { route } = require("./authuserRoutes");


router.route("/view-all-banner").get(ViewAllBanner)
router.route("/view-all-category").get(ViewCategory);
router.route("/view-all-products").get(viewAllProducts)
router.route("/view-single-product/:id").get(viewSingleProduct)
router.route("/view-category-products/:id").get(ViewCategoryProducts)
router.route("/get-subcategory-product").post(GetSubCategoryProducts)
router.route("/payment-integration").post(RazorpayIntegration)



module.exports = router;      