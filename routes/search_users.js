const User = require('../models/user');

module.exports = async (req, res) => {
    try {
        const { query } = req.body;

        if (query == null) {
            return res.status(400).send("All input is required");
        }

        // sanitize the query
        const regexp = new RegExp(query.replace(/(?=\W)/g, '\\'), 'i');
        
        // search by either username of fullName, exclude passwords from response
        const users = await User.find({ 
            $or: [ { username: regexp }, { fullName: regexp } ],
        }, { password: 0 });

        if (users) {
            return res.status(200).json(users);
        }

    } catch (err) {
        console.log(err);
    }
    res.status(400).send("Couldn't search the query");
};