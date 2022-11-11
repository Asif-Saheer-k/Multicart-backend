const express = require("express");
const db = require("./config/db");
const cors=require('cors')
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userRoutes = require("./userRoutes/authuserRoutes");
const adminRoutes = require("./adminRoutes/adminRoutes");
const cartRoutes=require("./userRoutes/cartRoutes")
const morgan=require('morgan')
__dirname = path.resolve();
require("dotenv").config({ path: __dirname + "/.env" });

const PORT = process.env.PORT || 9000;

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false 
}));
app.use(morgan('combined'));
  
// user routes
app.use("/api/user",userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user/cart",cartRoutes)
 
//database connection
db.connect((err) => {    
  if (err) {
    console.log("connection error" + err);
  } else {
    console.log("database connected");
  }
});

app.listen(PORT, console.log(`server started on PORT ${PORT}`));
