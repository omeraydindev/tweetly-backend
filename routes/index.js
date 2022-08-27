const auth = require('../middleware/auth');
const register = require('./register');
const login = require('./login');

const follow_user = require('./follow_user');
const edit_profile = require('./edit_profile');
const get_user_info = require('./get_user_info');
const search_users = require('./search_users');
const get_image = require('./get_image');
const get_profile_pic = require('./get_profile_pic');

const fetch_tweets = require('./fetch_tweets');
const post_tweet = require('./post_tweet');
const like_tweet = require('./like_tweet');
const retweet = require('./retweet');

module.exports = (app) => {
    app.post('/register', register);
    app.post('/login', login);

    app.post('/follow_user', [auth], follow_user);
    app.post('/edit_profile', [auth], edit_profile);
    app.post('/get_user_info', get_user_info);
    app.post('/search_users', search_users);
    app.get('/get_image/:id', get_image);
    app.get('/get_profile_pic/:id', get_profile_pic);

    app.post('/fetch_tweets', [auth], fetch_tweets);
    app.post('/like_tweet', [auth], like_tweet);
    app.post('/post_tweet', [auth], post_tweet);
    app.post('/retweet', [auth], retweet);
};

