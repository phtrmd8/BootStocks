const db = require('../models');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (app) {


    //ROUTE : /api/auth
    //Checking if user is logged in
    //Type: GET
    app.get('/api/auth', auth, async (req, res) => {
        try {
            const user = await db.User.findByPk(req.user.id);
            // console.log(user)
            if(!user){
                return res.status(400).json('Deleted User');
            }
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    //ROUTE : /api/auth
    //Log in
    //Type: POST
    app.post("/api/auth", async (req, res) => {
        const { username, password } = req.body;

        try {
            let user = await db.User.findOne({ where: { username } });

            if (!user) {
                return res
                    .status(400)
                    .json('Invalid Credentials');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json('Invalid Credentials');
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

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