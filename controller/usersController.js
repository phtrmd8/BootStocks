const db = require('../models');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (app) {
  app.post('/users', async function (req, res) {
    const { username, password, firstname, lastname, } = req.body;
    try {
      let user = await db.User.findOne({ where: { username: username } });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedP = await bcrypt.hash(password, salt);
      let createdUser = await db.User.create({ username, password: hashedP, firstname, lastname, user_money: 12344123 });

      const payload = {
        user: {
          id: createdUser.dataValues.id
        }
      }

      jwt.sign(payload, config.get('jwtSecretKey'), { expiresIn: 3600 }, function (err, token) {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
};