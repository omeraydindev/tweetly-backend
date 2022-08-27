const Follow = require('../models/follow');
const User = require('../models/user');

module.exports = async (req, res) => {
    try {
        const { uid } = req.body;

        // require all fields
        if (!(uid)) {
            return res.status(400).send("All input is required");
        }

        // check if user exists
        const userExists = await User.exists({ _id: uid });
        if (!userExists) {
            return res.status(400).send("The user doesn't exist");
        }

        // query user, exclude hashed password 
        const user = await User.findById(uid, { password: 0 }).lean();

        // add followers
        const followers = await Follow.find({ followeeUid: uid }).lean();
        user["followers"] = followers.map((e) => e["followerUid"]);

        // add followed people
        const followed = await Follow.find({ followerUid: uid }).lean();
        user["followed"] = followed.map((e) => e["followeeUid"]);

        if (user) {
            return res.status(200).json(user);
        }

    } catch (err) {
        console.log(err);
    }
    res.status(400).send("Couldn't get user info");
};