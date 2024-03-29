const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser')
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fileUpload=require("express-fileupload")
const cartRoutes=require("./userRoutes/cartRoutes")
const wishlistRoutes=require("./userRoutes/wishlistRoutes")
const commonRoutes=require("./userRoutes/commonRoutes")
const orderRoutes=require("./userRoutes/orderRoutes")
const adminRoutes=require("./userRoutes/adminRoutes")
const morgan = require("morgan");
__dirname = path.resolve();
require("dotenv").config({ path: __dirname + "/.env" });

const PORT = process.env.PORT || 9000;

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(express.urlencoded({ extended: true }));


// app.use(morgan("combined"));
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,auth-token');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(fileUpload())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: "key", cookie: { maxAge: 6000000 } }));
// user routes

app.use("/api/user/cart",cartRoutes);
app.use("/api/user/wishlist",wishlistRoutes);
app.use("/api/user/main",commonRoutes);
app.use("/api/user/order",orderRoutes); 
app.use("/api/admin",adminRoutes);


//database connection
db.connect((err) => {
  if (err) {
    console.log("connection error" + err);
  } else {
    console.log("database connected");
  }
});

app.listen(PORT, console.log(`server started on PORT ${PORT}`));
