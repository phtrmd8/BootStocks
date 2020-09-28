// api-routes.js - file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
const db = require("../models");
const auth = require("../middleware/auth");

// Routes
// =============================================================
module.exports = function (app) {
  // GET route for getting all of the categories
  app.get("/api/categories", auth, function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Category.findAll({ 
      where: { UserId: req.user.id },
      include: [db.Stock] 
    }).then(function (dbCategory) {
      // We have access to the categories as an argument inside of the callback function
      res.json(dbCategory);
    });
  });

  // POST route for saving a new category
  app.post("/api/categories", function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Category.create({
      UserId: req.body.user_id,
      name: req.body.category_name
    })
      .then(function (dbCategory) {
        // We have access to the new category as an argument inside of the callback function
        res.json(dbCategory);
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // DELETE route for deleting categories. We can get the id of the category to be deleted from
  // req.params.id
  app.delete("/api/categories/:id", function (req, res) {
    // We just have to specify which category we want to destroy with "where"
    db.Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbCategory) {
      res.json(dbCategory);
    });
  });

  // PUT route for updating categories. We can get the updated category data from req.body
  app.put("/api/categories", function (req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Category.update(
      {
        UserId: req.body.user_id,
        name: req.body.category_name
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(function (dbCategory) {
        res.json(dbCategory);
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
};
