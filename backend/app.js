const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(cookieParser());


const user = require('./routes/userRoute');
const routes = require('./routes/staticContent');

// api v1
app.use("/api/v1", user);

// Static Content Routes

// middleware for Error
app.use(errorMiddleware);

// exports
module.exports = app;