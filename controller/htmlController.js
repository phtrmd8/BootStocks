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
        // console.log(req)
        res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    });

    //route loads members.html
    app.get("/members", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/members.html"));
    });

    // stocks route loads stocks.html
    app.get("/stocks/view", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/stocks.html"));
    });

    // categories route loads categories.html
    app.get("/categories/view", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/categories.html"));
    });

    app.get("/stocks/add", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/addstocks.html"));
    });

    app.get("/categories/add", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/addcats.html"));
    });

};