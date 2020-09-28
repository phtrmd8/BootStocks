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
  app.get("/api/stocks", auth, function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Stock.findAll({
      where: { UserId: req.user.id, is_sold: 0 },
      include: [db.Category]
    }).then(function(dbStock) {
      // We have access to the stocks as an argument inside of the callback function
      // console.log(dbStock);
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
      // console.log(buyingPrice);
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

      const getOneUser = await db.User.findByPk(req.user.id);
      if (newStock.total > getOneUser.user_money) {
        return res.status(500).json("Invalid Transaction!");
      }
      const stockCreated = await db.Stock.create(newStock);
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
  app.put("/api/stocks", auth, async function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    const { stockId, currentStocKPrice } = req.body;
    try {
      const currentStock = await db.Stock.findByPk(stockId);
      const currentUser = await db.User.findByPk(req.user.id);
      const currentTotal =
        parseFloat(currentStocKPrice) * parseFloat(currentStock.stock_quantity);
      // console.log(currentStock);
      currentStock.stock_gain = currentTotal - currentStock.total;
      currentStock.is_sold = true;
      // const currentMoney = ();
      console.log(`${typeof currentUser.user_money} : ${typeof currentTotal}`);
      currentUser.user_money =
        parseFloat(currentUser.user_money) + currentTotal;
      await currentStock.save();
      const returnedUser = await currentUser.save();
      res.status(200).json({
        alert: `${currentStock.stock_symbol} is sold! You gained ${currentTotal}`,
        userMoney: returnedUser.user_money
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.put("/api/stocks/stockgain", auth, async function(req, res) {
    const { stockId, currentStocKPrice } = req.body;
    try {
      const currentStock = await db.Stock.findByPk(stockId);
      // const currentUser = await db.User.findByPk(req.user.id);
      const currentTotal =
        parseFloat(currentStocKPrice) * parseInt(currentStock.stock_quantity);
      currentStock.stock_gain = currentTotal - parseFloat(currentStock.total);
      const stock = await currentStock.save();
      // console.log(currentTotal - parseFloat(currentStock.total));
      res.status(200).json({
        stockGain: stock.stock_gain,
        alert: `${stock.stock_symbol} is synced! ${
          stock.stock_gain < 0
            ? "You loss $ " + stock.stock_gain
            : "You gained $ " + stock.stock_gain
        }`
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });
};
