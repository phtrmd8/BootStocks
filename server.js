// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var exphbs = require('express-handlebars')
var compression = require('compression')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

//Setting the handlebars extension to .hbs
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', '.hbs');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// app.get("*", function(req, res) {
//     if (req.originalUrl === "/") res.render("index");
//     else res.render(req.originalUrl.slice(1));
// });

// compress all responses
app.use(compression())

// Controllers
// =============================================================

require("./controller/authController")(app);
require("./controller/usersController")(app);
require("./controller/stocksController")(app);
require("./controller/categoriesController")(app);
require("./controller/htmlController")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
