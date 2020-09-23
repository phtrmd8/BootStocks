// html-routes.js - file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads frontpage.html
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/frontpage.html"));
    });

    // signup route loads signup.html
    app.get("/signup", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    });

    // stocks route loads stocks.html
    app.get("/stocks/view", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/stocks.html"));
    });

    // categories route loads categories.html
    app.get("/categories/view", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/categories.html"));
    });

};