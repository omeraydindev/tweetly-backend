const mongoose = require('mongoose');

// connect to mongodb
module.exports = mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});