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

const AddBanner = asyncHandler(async (req, res) => {
    console.log(req.body);
    const bannerData = req.body;
    const Insert = await db.get().collection(collection.BANNER_COLLECTION).insertOne(bannerData);
    if (Insert) {
        console.log(Insert);
        res.status(200).json("Success");
    } else {
        res.status(401).json("Something Went Wrong");
    }
});
const ViewAllBanner = asyncHandler(async (req, res) => {
    const AllBanner = await db.get().collection(collection.BANNER_COLLECTION).find().toArray();
    if (AllBanner) {
        res.status(200).json(AllBanner);
    } else {
        res.status(201).json("NO RECORDS");
    }
});
const DeleteBanner = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const DeleteBanner = await db
        .get()
        .collection(collection.BANNER_COLLECTION)
        .deleteOne({ _id: ObjectId(id) });
    if (DeleteBanner) {
        res.status(200).json("Success");
    } else {
        res.status(405).json("Somthing Went Wrong");
    }
});



module.exports = {
    AddBanner,
    ViewAllBanner,
    DeleteBanner,

};