const mongoose = require('mongoose');

// schema for a User model

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    username: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: { 
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "620bed510469077ec3e6420d"
    },
    bio: {
        type: String,
        default: "",
        maxlength: 255,
        trim: true,
    },

    token: { // for the jwtToken to be appendable
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);