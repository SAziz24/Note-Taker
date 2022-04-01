// DEPENDENCIES
const express = require("express");
const path  =  require("path");
const fs = require("fs");
const util = require("util");


// Express configuration
const app = express();


// PORT Defined
const PORT = process.env.PORT || 8080;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// middleware for public files
app.use(express.static("public")); 

// routes for API & HTML
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

// LISTENER - starting server
app.listen(process.env.PORT || 8080, () => {
    console.log("App listening on PORT: ${PORT}")
});