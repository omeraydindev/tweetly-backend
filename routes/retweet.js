const Tweet = require('../models/tweet');

module.exports = async (req, res) => {
    try {
        const { tweetId } = req.body;

        // validate data
        if (!(tweetId)) {
            return res.status(400).send("All input is required");
        }

        // check if tweet exists
        const tweetExists = await Tweet.exists({ _id: tweetId });
        if (!tweetExists) {
            return res.status(400).send("Tweet does not exist");
        }

        // create the mock tweet with the retweet info
        const tweet = await Tweet.create({
            uid: req.user.uid,
            content: "content",
            retweetInfo: {
                tweetId: tweetId,
            },
        });

        if (tweet) {
            return res.status(200).send('Done');
        }

    } catch (err) {
        console.log(err);
    }
    res.status(400).send("Couldn't retweet");
};