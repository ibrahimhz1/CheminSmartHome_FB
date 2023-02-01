const app = require('./app');
const port = 3000;
require("dotenv").config()
const connectDatabase = require('./config/dbconn');

// Database Connection
connectDatabase();



// Server Listening
const server = app.listen(port, ()=> {
    console.log(`Server listening on http://localhost:${process.env.PORT || port}`);
})

