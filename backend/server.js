const express = require("express");
const db = require("./config/db");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userRoutes = require("./userRoutes/authuserRoutes");
const adminRoutes = require("./adminRoutes/adminRoutes");
const cartRoutes=require("./userRoutes/cartRoutes")
__dirname = path.resolve();


require("dotenv").config({ path: __dirname + "/.env" });

const PORT = process.env.PORT || 9000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "key", cookie: { maxAge: 6000000 } }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE"
  );
  next();
});
// user routes
app.use("/api/user",userRoutes);
app.use("/api/amdin", adminRoutes);
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
