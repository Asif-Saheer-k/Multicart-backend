const express = require("express");
const router = express.Router();
const {verifyToken}=require('../middlewares/jwtTokenverification')
const {AdminLogin,ViewALLuser,DeleteUser}=require('../adminControlls/adminControlls')

router.route('/login').post(AdminLogin)
router.route('/view-allusers').get(ViewALLuser)
router.route('/delete-user/:id').delete(DeleteUser)

module.exports = router;