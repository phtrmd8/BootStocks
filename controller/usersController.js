const db = require('../models');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//Register User
//Route : /api/users
module.exports = function (app) {
  app.post('/api/users', async function (req, res) {
    const { username, password,email, firstname, lastname, cpassword } = req.body;

    if(password !== cpassword){
      return res.status(400).json("Passwords didn't match");
    }

    try {
      let user = await db.User.findOne({ where: { username: username } });
      if (user) {
        return res.status(400).json('User already exists');
      }
      const salt = await bcrypt.genSalt(10);
      const hashedP = await bcrypt.hash(password, salt);
      let createdUser = await db.User.create({ username,email, password: hashedP, firstname, lastname, user_money: 10000 });

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