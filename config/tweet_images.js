const mongoose = require('mongoose');

// storage for images in tweets
module.exports = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'tweet_images'
});