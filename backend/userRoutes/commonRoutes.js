const express = require("express");

const router = express.Router();
const { viewSingleProduct,GetSubCategoryProducts,ViewProductList } = require("../userControls/commonControls");
const { viewAllProducts, ViewCategoryProducts } = require("../adminControls/productControl");
const { ViewAllBanner } = require("../adminControls/bannercontrol");
const { ViewCategory } = require("../adminControls/categorycontrol");



 
router.route("/view-all-banner").get(ViewAllBanner)
router.route("/view-all-category").get(ViewCategory);
router.route("/view-all-products").get(viewAllProducts)
router.route("/view-single-product/:id").get(viewSingleProduct)
router.route("/view-category-products/:id").get(ViewCategoryProducts)
router.route("/get-subcategory-product").post(GetSubCategoryProducts)
router.route("/view-list-product").get(ViewProductList)


module.exports = router;      