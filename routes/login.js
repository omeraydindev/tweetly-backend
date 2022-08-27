const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/user');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;

        // require all fields
        if (!(username && password)) {
            return res.status(400).send("All input is required");
        }

        // find user with username
        const user = await User.findOne({ username: username });

        if (user) {
            const passValid = await bcrypt.compare(password, user.password);
        
            if (passValid) {
                
                // create jwt token
                const jwtToken = jwt.sign({
                    uid: user._id, username: username
                }, process.env.JWT_SECRET, {
                    "expiresIn": "4h"
                });

                // append the token to response
                user.token = jwtToken;

                res.status(200).json(user);

            } else {
                res.status(400).send("Incorrect password");
            }
        } else {
            res.status(400).send("User does not exist");
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).send("Couldn't log in user");
    }
};