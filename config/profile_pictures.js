const mongoose = require('mongoose');

// storage for profile pictures (pfp) of users
module.exports = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'profile_pictures'
});