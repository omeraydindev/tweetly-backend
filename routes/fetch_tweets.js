const User = require('../models/user');
const Tweet = require('../models/tweet');

module.exports = async (req, res) => {
    try {
        const { uid, replyingToTweet } = req.body;

        let options = {};
        if (uid) { // if a UID is specified
            options = { uid: uid };
        } else if (replyingToTweet) { // if a replyingToTweet is specified
            options = { 'replyInfo.tweetId': replyingToTweet };
        }

        // get tweets
        const tweets = await Tweet.find(options).sort({ timestamp: 'descending' }).lean();

        // append more crucial info to tweets
        for (let tweet of tweets) {
            // re-fetch the tweet if it is a retweet
            const retweetInfo = tweet['retweetInfo'];
            if (retweetInfo) {
                const retweetUid = tweet["uid"];
                const refetched = await Tweet.findById(retweetInfo['tweetId']).lean();
                Object.assign(tweet, refetched); // js wizardry

                // append info of the user that retweeted it
                const retweetUser = await User.findById(retweetUid).select('username');
                tweet['retweetInfo'] = {
                    uid: retweetUid,
                    username: retweetUser['username'],
                };
            }
            
            // append more user info
            const user = await User.findById(tweet["uid"], { password: 0 });
            tweet["user"] = user;

            // append more reply info
            let replyInfo = tweet["replyInfo"];
            if (replyInfo) {
                for (let replyUser of replyInfo["users"]) {
                    const user = await User.findById(replyUser['uid']).select('username');
                    replyUser['username'] = user['username'];
                }
            } else {
                replyInfo = {};
            }

            // append reply count
            // replyInfo["replyCount"] = await Tweet.countDocuments({ 'replyInfo.tweetId': tweet['_id'] });
            replyInfo["replyCount"] = 0;
            tweet["replyInfo"] = replyInfo;
        }

        return res.status(200).json(tweets);
    } catch (err) {
        console.log(err);
    }
    res.status(400).send("Couldn't fetch tweets");
};