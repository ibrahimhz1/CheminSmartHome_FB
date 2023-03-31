const app = require('./app');
const dotenv = require('dotenv');


// dotenv config
dotenv.config({path: "backend/config/config.env"});

require("dotenv").config()

const connectDatabase = require('./config/dbconn');

// Database Connection
connectDatabase();



// Server Listening
const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on http://localhost:${process.env.PORT || port}`);
})

