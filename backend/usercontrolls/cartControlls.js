const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const collection = require("../config/collection");
const { ObjectId } = require("mongodb");

const addToCart = asyncHandler(async (req, res) => {
  const proId = req.body.ProId;
  const userId = req.body.userId;
  const variantsId = parseInt(req.body.variantsId);
  const proObj = {
    item: ObjectId(proId),
    quantity: 1,
    variantsId,
  };
  if (variantsId && userId && proId) {
    let userCart = await db
      .get()
      .collection(collection.CART_COLLECTION)
      .findOne({ userId: userId });
    if (userCart) {
      let proExist = userCart.products.findIndex(
        (product) => product.item == proId && product.variantsId == variantsId
      );

      if (proExist != -1) {
        const incquantity = await db
          .get()
          .collection(collection.CART_COLLECTION)
          .updateOne(
            { userId: userId, "products.item": ObjectId(proId) },
            {
              $inc: { "products.$.quantity": 1 },
            }
          );
        if (incquantity) {
          res.status(200).json("quantity updated");
        } else {
          res.status(500).json("Somthing went wrong...");
        }
      } else {
        const update = await db
          .get()
          .collection(collection.CART_COLLECTION)
          .updateOne(
            { userId: userId },
            {
              $push: { products: proObj },
            }
          );
        if (update) {
          res.status(200).json("Product Added");
        } else {
          res.status(500).json("Something went wrong....");
        }
      }
    } else {
      let cartObj = {
        userId: userId,
        products: [proObj],
      };

      const insert = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .insertOne(cartObj);
      if (insert) {
        res.status(200).json("Cart updated");
      } else {
        res.status(500).json("Something went wrong....");
      }
    }
  } else {
    res.status(400).json("Please updated Fields");
  }
});

const getCartProduct = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  let cartItems = await db
    .get()
    .collection(collection.CART_COLLECTION)
    .aggregate([
      {
        $match: { userId: userId },
      },
      {
        $unwind: "$products",
      },
      {
        $project: {
          item: "$products.item",
          quantity: "$products.quantity",
          variantsId: "$products.variantsId",
        },
      },
      {
        $lookup: {
          from: collection.PRODUCT_COLLECTION,
          localField: "item",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          item: 1,
          quantity: 1,
          variantsId: 1,
          product: { $arrayElemAt: ["$product", 0] },
        },
      },
    ])
    .toArray();
  if (cartItems) {
    res.status(200).json(cartItems);
  } else {
    res.status(401).json("Cart Empty");
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const UserID = req.body.userId;
  const ProductID = req.body.ProId;
  const variantsId = parseInt(req.body.variantsId);
  console.log(req.body,variantsId);
  const deletes = await db
    .get()
    .collection(collection.CART_COLLECTION)
    .updateOne(
      {
        userId:UserID,
      },
      {
        $pull: {
          products: { item:ObjectId(ProductID),variantsId: variantsId },
        },
      }
    );
  console.log(deletes);
  if (deletes) {
    res.status(200).json("deleted");
  } else {
    res.status(500).json("Somthing went wrong....");
  }
});

module.exports = { addToCart, getCartProduct, removeProductFromCart };
