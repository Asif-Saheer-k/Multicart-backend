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

const ViewProductList=(async(req,res)=>{
  console.log(req.query.page);
 const page= parseInt(req.query.page)
 const items=parseInt(req.query.item) 
 const skip = (page - 1) * items;
 const subcategory=req.query.subcategory
 const products = await db
 .get()
 .collection(collection.PRODUCT_COLLECTION)
 .find({ hidden: false, stockManagement:true,subCategory:subcategory }).sort({_id:-1}).skip(skip).limit(items).toArray()
if (products) {
 res.status(200).json(products);
} else {
 res.status(400).json("Something Went Wrong");
}


})
module.exports = {
  viewSingleProduct,
  RazorpayIntegration,
  GetSubCategoryProducts,
  ViewProductList
};
