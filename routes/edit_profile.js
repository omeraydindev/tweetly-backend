const User = require('../models/user');

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
                    bucketName: 'profile_pictures'
                };
                resolve(fileInfo);
            });
        }
    });
    const upload = multer({ storage: storage }).fields([{
        name: 'image',
        maxCount: 1
    }]);

    // upload middleware
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).send("Couldn't edit profile");
        }

        try {
            // get POST data
            let { fullName, username, bio, email } = req.body;

            // check if username exists
            let count = await User.countDocuments({
                _id: { $ne: req.user.uid },
                username: username,
            });
            if (count > 0) {
                return res.status(400).send('This username is already in use');
            }

            // check if email exists
            count = await User.countDocuments({
                _id: { $ne: req.user.uid },
                email: email,
            });
            if (count > 0) {
                return res.status(400).send('This email is already in use');
            }

            // get pfp
            const profilePic = (req.files != null && req.files['image'] != null && req.files['image'].length == 1)
                ? req.files['image'][0].id
                : null;

            // edit profile
            let options = {
                fullName: fullName,
                username: username,
                bio: bio,
                email: email,
            };
            if (profilePic) {
                options['profilePic'] = profilePic;
            }
            const user = await User.findByIdAndUpdate(req.user.uid, options);

            if (user) {
                return res.status(200).send('Done');
            }

        } catch (err) {
            console.log(err);
        }
        res.status(400).send("Couldn't edit profile");
    });
};