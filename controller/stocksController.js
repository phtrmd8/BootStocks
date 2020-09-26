// api-routes.js - file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
const db = require("../models");
const auth = require("../middleware/auth");
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the stocks
  app.get("/api/stocks", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Stock.findAll({}).then(function(dbStock) {
      // We have access to the stocks as an argument inside of the callback function
      res.json(dbStock);
    });
  });

  // POST route for saving a new stock
  app.post("/api/stocks", auth, async function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    try {
      const { stockTicker, buyingPrice, category, quantity } = req.body;
      const [upCategory, catCreated] = await db.Category.findOrCreate({
        where: { name: category },
        defaults: {
          name: category
            .trim()
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" "),
          UserId: req.user.id
        }
      });

      const newStock = {
        stock_symbol: stockTicker,
        buying_price: buyingPrice,
        CategoryId: upCategory.id,
        UserId: req.user.id,
        current_price: buyingPrice,
        stock_gain: 0,
        is_sold: 0,
        total: buyingPrice * quantity,
        stock_quantity: quantity
      };
      const stockCreated = await db.Stock.create(newStock);
      const getOneUser = await db.User.findByPk(req.user.id);
      getOneUser.user_money -= newStock.total;
      await getOneUser.save();
      res.status(200).json(stockCreated);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  // DELETE route for deleting stocks. We can get the id of the stock to be deleted from
  // req.params.id
  app.delete("/api/stocks/:id", function(req, res) {
    // We just have to specify which stock we want to destroy with "where"
    db.Stock.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbStock) {
      res.json(dbStock);
    });
  });

  // PUT route for updating stocks. We can get the updated stock data from req.body
  app.put("/api/stocks", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Stock.update(
      {
        UserId: req.body.user_id,
        stock_symbol: req.body.stock_symbol,
        CategoryId: req.body.category_id,
        buying_price: req.body.buying_price,
        current_price: req.body.current_price,
        stock_gain: req.body.stock_gain,
        is_sold: req.body.is_sold,
        stock_quantity: req.body.stock_quantity
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(function(dbStock) {
        res.json(dbStock);
      })
      .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
};
