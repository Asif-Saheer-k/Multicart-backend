const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const collection = require("../config/collection");
const generateToken = require("../utils/jwtToken");

const AdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (email == ADMIN_EMAIL) {
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
  try {
    const AllUsers = await db
      .get()
      .collection(collection.USER_COLLECTION)
      .find()
      .toArray();
    res.status(200).json(AllUsers);
  } catch (error) {
    res.status(400).json("No Records");
  }
});
const DeleteUser = asyncHandler(async (req, res) => {
  const ID = req.params.id;
  try {
    await db
      .get()
      .collection(collection.USER_COLLECTION)
      .deleteOne({ CUST_ID: parseInt(ID) });
    res.status(200).json("Deleted");
  } catch (erorr) {
    res.status(500).json("Somthing Went Wrong");
  }
});
module.exports = { AdminLogin, ViewALLuser, DeleteUser };
