const express = require("express");
const router = express.Router();
const {verifyToken}=require('../middlewares/jwtTokenverification')
const {AdminLogin,ViewALLuser,DeleteUser,AddBanner,ViewAllBanner}=require('../adminControlls/adminControlls')

router.route('/login').post(AdminLogin)
router.route('/view-allusers').get(verifyToken,ViewALLuser)
router.route('/delete-user/:id').delete(verifyToken,DeleteUser)
router.route("/add-banner").post(verifyToken,AddBanner)
router.route("/view-all-banner").get(verifyToken,ViewAllBanner)

module.exports = router;