const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userRoutes = require("./userRoutes/authuserRoutes");
const adminRoutes = require("./adminRoutes/adminRoutes");
const cartRoutes = require("./userRoutes/cartRoutes");
const morgan = require("morgan");
__dirname = path.resolve();
require("dotenv").config({ path: __dirname + "/.env" });

const PORT = process.env.PORT || 9000;

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(morgan("combined"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );

  next();
});

// user routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user/cart", cartRoutes);

//database connection
db.connect((err) => {
  if (err) {
    console.log("connection error" + err);
  } else {
    console.log("database connected");
  }
});

app.listen(PORT, console.log(`server started on PORT ${PORT}`));
