const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// schema for a Follow model

const followSchema = new mongoose.Schema({
    followerUid: {
        type: String,
        required: true,
    },
    followeeUid: {
        type: String,
        required: true,
    },
});

followSchema.index({ followerUid: 1, followeeUid: 1 }, { unique: true });
followSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Follow', followSchema);