const Follow = require('../models/follow');
const User = require('../models/user');

module.exports = async (req, res) => {
    try {
        const { uid, followStatus } = req.body; // uid -> user to follow

        // require all fields
        if (!(uid && followStatus)) {
            return res.status(400).send("All input is required");
        }

        // check if user is trying to follow him/herself
        if(uid.trim() === req.user.uid.trim()) {
            return res.status(400).send("You can't follow yourself");
        }

        // check if user exists
        const userExists = await User.exists({ _id: uid });
        if (!userExists) {
            return res.status(400).send("The user doesn't exist");
        }

        const options = {
            followerUid: req.user.uid,
            followeeUid: uid,
        };

        // follow or unfollow depending on the input
        if (followStatus == "true") {
            const follow = await Follow.create(options);
            return res.status(200).json(follow);
        } else if (followStatus == "false") {
            const follow = await Follow.findOneAndDelete(options);
            return res.status(200).json(follow);
        }

    } catch (err) {
        console.log(err);
    }
    res.status(400).send("Couldn't follow user");
};