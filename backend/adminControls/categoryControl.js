const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const collection = require("../config/collection");
const generateToken = require("../utils/jwtToken");
const AWS = require("aws-sdk");
const { ObjectId } = require("mongodb");
const multer = require("multer");
const sharp = require("sharp");
const { CATEGORY_COLLECTION } = require("../config/collection");
AWS.config.update({ region: "us-east-1" });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});
let upload = multer({
    limits: 1024 * 1024 * 5,
    fileFilter: function (req, file, done) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
            done(null, true);
        } else {
            done("Multer File Type in not supported");
        }
    },
});

const uploadS3 = (fileData) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${Date.now().toString()}.jpg`,
            Body: fileData,
        };
        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(data);
                return resolve(data);
            }
        });
    });
};




const AddCategory = asyncHandler(async (req, res) => {
    const category = req.body;
    const update = await db.get().collection(collection.CATEGORY_COLLECTION).insertOne(category);
    if (update) {
        res.status(200).json(update);
    } else {
        res.status(500).json("Somthing Went Wrong");
    }
});

const ViewCategory = asyncHandler(async (req, res) => {
    const TotalCategory = await db.get().collection(collection.CATEGORY_COLLECTION).find().toArray();
    if (TotalCategory) {
        res.status(200).json(TotalCategory);
    } else {
        res.status(500).json("Somthing Went Wrong");
    }
});
const DeleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deleteCategory = await db
        .get()
        .collection(collection.CATEGORY_COLLECTION)
        .deleteOne({ _id: ObjectId(id) });
    if (deleteCategory) {
        res.status(200).json(deleteCategory);
    } else {
        res.status(500).json("Somthing Went Wrong");
    }
});

const AddSubCategory = asyncHandler(async (req, res) => {
    const varition = req.body;
    const updateCategory = req.body.category;
    console.log(req.body);
    const update = await db
        .get()
        .collection(collection.CATEGORY_COLLECTION)
        .update({ Category: updateCategory }, { $push: { variation: varition } });

    if (update) {
        res.status(200).json("Success");
    } else {
        res.status(401).json("Somthing Went Wrong");
    }
});



const EditCategory = async (req, res) => {
    const { Category, image, variation } = req.body;
    const data = await db
        .get()
        .collection(CATEGORY_COLLECTION)
        .updateOne(
            {
                Category: Category,
            },
            { $set: { image: image, variation: variation } }
        );
    if (data) {
        res.status(201).json("Success");
    } else {
        res.status(500).json("Something Went Wrong");
    }
};
const EditSubCategoryVariants = async (req, res) => {
    const data = req.body;
    const result = await db
        .get()
        .collection(CATEGORY_COLLECTION)
        .updateOne(
            {
                Category: data.category,
                "variation.subcategory": data.subcategory,
            },
            { $set: { "variation.$.variants": data.variants, "variation.$.Description": data.Description } }
        );
        console.log(result); 
    if (result) {
        res.status(201).json("Updated");
    } else {
        res.status(401).json("Somthing Went Wrong");
    }
};
module.exports = {
    AddCategory,
    ViewCategory,
    DeleteCategory,
    AddSubCategory,
    EditCategory,
    EditSubCategoryVariants,
};