const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/jwtTokenverification");
const {
  AdminLogin,
  ViewALLuser,
  DeleteUser,
  AddBanner,
  ViewAllBanner,
  DeleteBanner,
  AddCategory,
  ViewCategory,
  DeleteCategory,
  AddSubCategory,
  Addproducts,
  ImageUploading
} = require("../adminControlls/adminControlls");

router.route("/login").post(AdminLogin);
router.route("/view-allusers").get(verifyToken, ViewALLuser);
router.route("/delete-user/:id").delete(verifyToken, DeleteUser);
router.route("/add-banner").post(verifyToken, AddBanner);
router.route("/view-all-banner").get(verifyToken, ViewAllBanner);
router.route("/delete-banner/:id").delete(verifyToken, DeleteBanner);
router.route("/add-category").post(verifyToken, AddCategory);
router.route("/view-all-category").get(verifyToken, ViewCategory);
router.route("/delete-category/:id").get(verifyToken, DeleteCategory);
router.route("/add-sub-category").post(verifyToken,AddSubCategory) 
router.route("/add-products").post(verifyToken,Addproducts)
router.route("/image-uploading").post(ImageUploading)
module.exports = router;
