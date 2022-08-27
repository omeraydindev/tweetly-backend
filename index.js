require('dotenv').config();

// express app
const express = require('express');
const app = express();
app.use(express.json());

// cors - todo
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            // access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// connect to db
const db = require('./config/database');
db.then((_) => {
    console.log('connected to db');

    // start listening
    app.listen(process.env.PORT || process.env.LOCAL_PORT);

    // init routes
    require('./routes')(app);
}).catch((err) => {
    console.log(err);
});
