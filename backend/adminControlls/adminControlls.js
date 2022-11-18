const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const collection = require("../config/collection");
const generateToken = require("../utils/jwtToken");

const AdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log(process.env.ADMIN_EMAI, process.env.ADMIN_PASSWORD);
  if (email == process.env.ADMIN_EMAIL) {
    if (password == process.env.ADMIN_PASSWORD) {
      const token = generateToken(password);
      res.status(200).json({ token });
    } else {
      res.status(401).json("Invalid password");
    }
  } else {
    res.status(401).json("Invalid Email Address");
  }
});
const ViewALLuser = asyncHandler(async (req, res) => {
  console.log("DCCCs");
  try {
    const AllUsers = await db
      .get()
      .collection(collection.USER_COLLECTION)
      .find()
      .toArray();
    console.log(AllUsers);
    res.status(200).json(AllUsers);
  } catch (error) {
    res.status(400).json("No Records");
  }
});
const DeleteUser = asyncHandler(async (req, res) => {
  const ID = req.params.id;
  console.log(ID);

  const deleted = await db
    .get()
    .collection(collection.USER_COLLECTION)
    .deleteOne({ CUST_ID: parseInt(ID) });

  if (deleted) {
    res.status(200).json("Deleted");
  } else {
    res.status(500).json("Somthing Went Wrong");
  }
});
const AddBanner = asyncHandler(async (req, res) => {
  console.log(req.body);
  const bannerData = req.body;
  const Insert = await db
    .get()
    .collection(collection.BANNER_COLLECTION)
    .insertOne(bannerData);
  if (Insert) {
    console.log(Insert);
    res.status(200).json("Succes");
  } else {
    res.status(401).json("Somthing Went Wrong");
  }
});
module.exports = { AdminLogin, ViewALLuser, DeleteUser, AddBanner };
