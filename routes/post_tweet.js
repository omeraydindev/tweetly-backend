const Tweet = require('../models/tweet');

const path = require('path');
const mongoose = require("mongoose");
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// todo: refactor

module.exports = async (req, res) => {

    const storage = new GridFsStorage({
        db: mongoose.connection.db,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                const filename = req.body.fileName + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'tweet_images'
                };
                resolve(fileInfo);
            });
        }
    });
    // max 4 images are allowed
    const upload = multer({ storage: storage }).array('image', 4);

    // upload middleware
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).send("Couldn't post tweet");
        }

        try {
            // get POST data
            let { content, replyInfo } = req.body;

            // validate data
            if (!(content)) {
                return res.status(400).send("All input is required");
            }

            // parse replyinfo
            if (replyInfo) {
                replyInfo = JSON.parse(replyInfo);
            }

            const images = req.files != null ? req.files.map((e) => e.id) : [];

            // post tweet
            const tweet = await Tweet.create({
                uid: req.user.uid,
                content: content,
                images: images,
                replyInfo: replyInfo,
            });

            res.status(200).json(tweet);

        } catch (err) {
            console.log(err);
            res.status(400).send("Couldn't post tweet");
        }
    });
};