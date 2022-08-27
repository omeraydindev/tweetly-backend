const mongoose = require('mongoose');

// schema for Tweet model

const replyUserSchema = new mongoose.Schema({
    uid: {
        type: String,
    },
    username: {
        type: String,
    },
});
const replyInfoSchema = new mongoose.Schema({
    replyCount: {
        type: Number,
    },
    tweetId: {
        type: String,
    },
    users: [replyUserSchema],
});
const retweetInfoSchema = new mongoose.Schema({
    tweetId: {
        type: String,
    },
    uid: {
        type: String,
    },
    username: {
        type: String,
    },
});
const tweetSchema = new mongoose.Schema({
    uid : {
        type: String,
        required: true,
    },
    content : {
        type: String,
        required: true,
        trim: true,
        maxlength: 140,
    },
    timestamp : {
        type: Date,
        default: Date.now
    },
    likes : [{
        type: String, // uid list
    }],
    images : [{
        type: String, // image link list
        validate: {
            validator: function(v,x,z) {
                return !(this.images.length > 4); // max images  
            },
            message: props => `${props.value} exceeds the max images limit (4)`,
        }
    }],
    replyInfo: replyInfoSchema,
    retweetInfo: retweetInfoSchema,
});

module.exports = mongoose.model('Tweet', tweetSchema);