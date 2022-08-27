const Tweet = require('../models/tweet');

module.exports = async (req, res) => {
    try {
        // get POST data
        const { tweet_id, like_status } = req.body;

        // validate data
        if (!(tweet_id && like_status)) {
            return res.status(400).send("All input is required");
        }

        let tweet;

        if (like_status == "true") {

            // add like
            tweet = await Tweet.findOneAndUpdate({ _id: tweet_id }, {
                $addToSet: { // add it only once
                    likes: req.user.uid
                }
            }, { returnDocument: "after" });

        } else if (like_status == "false") {

            // remove like
            tweet = await Tweet.findOneAndUpdate({ _id: tweet_id }, {
                $pullAll: {
                    likes: [req.user.uid]
                }
            }, { returnDocument: "after" });

        } else {
            return res.status(400).send("Invalid input");
        }

        res.status(200).json(tweet);

    } catch (err) {
        console.log(err);
        res.status(400).send("Couldn't like tweet");
    }
};