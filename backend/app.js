const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(cookieParser());


// Sample Routes for testing purpose
app.get("/", (req, res)=> {
    res.status(200).send("<h1>hello world from Express App Ecommerce App</h1>");
});
app.get("/about", (req, res)=> {
    res.status(200).send("<h1>This is About page</h1>");
});
app.get("/contact", (req, res)=> {
    res.status(200).send("<h1>This is Contact page</h1>");
});
app.get("*", (req, res)=> {
    res.status(500).send("<h1>Error page : U visited the wrong endpoint</h1>")
});



const user = require('./routes/userRoute');
const routes = require('./routes/staticContent');

// api v1
app.use("/api/v1", user);
// app.use("/", routes)
// Static Content Routes

// middleware for Error
app.use(errorMiddleware);

// exports
module.exports = app;