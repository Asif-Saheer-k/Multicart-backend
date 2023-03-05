const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const collection = require("../config/collection");
const { ObjectId } = require("mongodb");

const viewSingleProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await db
    .get()
    .collection(collection.PRODUCT_COLLECTION)
    .findOne({ _id: ObjectId(id) });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json("Something went Wrong");
  }
});
const RazorpayIntegration = asyncHandler(async (req, res) => {
  const data = req.body;
  const order = db
    .get()
    .collection(collection.ORDER_COLLECTION)
    .insertOne(data);
  if (order) {
    res.status(200).json("Success");
  } else {
    res.status(400).json("Something went wrong");
  }
});
const GetSubCategoryProducts = asyncHandler(async (req, res) => {
  const { category, subCategory } = req.body;
  const product = await db
    .get()
    .collection(collection.PRODUCT_COLLECTION)
    .find({
      stockManagement: true,
      hidden: false,
      category: category,
      subCategory: subCategory,
    });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(201).json("No Records");
  }
});
module.exports = {
  viewSingleProduct,
  RazorpayIntegration,
  GetSubCategoryProducts,
};
