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

const AdminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
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
    try {
        const AllUsers = await db.get().collection(collection.USER_COLLECTION).find().toArray();
        console.log(AllUsers);
        res.status(200).json(AllUsers);
    } catch (error) {
        res.status(400).json("No Records");
    }
});
const DeleteUser = asyncHandler(async (req, res) => {
    const ID = req.params.id;
    const deleted = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .deleteOne({ _id: ObjectId(ID) });

    if (deleted) {
        res.status(200).json("Deleted");
    } else {
        res.status(500).json("Something Went Wrong");
    }
});



module.exports = {
    AdminLogin,
    ViewALLuser,
    DeleteUser,

};