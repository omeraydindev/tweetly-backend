const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/user');

module.exports = async (req, res) => {
    try {
        const { username, fullName, email, password } = req.body;

        // require all fields
        if (!(username && fullName && email && password)) {
            return res.status(400).send("All input is required");
        }

        // throw error if username or email exists
        if (await User.exists({ username: username })) {
            return res.status(400).send("This username already exists");
        }
        if (await User.exists({ email: email })) {
            return res.status(400).send("This email already exists");
        }

        // hash password to store
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user in db
        const user = await User.create({
            username: username,
            email: email,
            fullName: fullName,
            password: hashedPassword
        });

        // create jwt token
        const jwtToken = jwt.sign({
            uid: user._id, username: username
        }, process.env.JWT_SECRET, {
            "expiresIn": "4h"
        });

        // append the token to user object
        user.token = jwtToken;

        res.status(201).json(user);

    } catch (err) {
        console.log(err);
        res.status(400).send("Couldn't create user");
    }

};