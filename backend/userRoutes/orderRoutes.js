const express = require("express");
const { RazorpayIntegration } = require("../userControls/commonControls");
const router=express.Router()
router.route("/payment-integration").post(RazorpayIntegration)

module.exports=router