const db = require('../models');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// console.log(
// (async ()=> {
//     const salt = await bcrypt.genSalt(10);
//     password = await bcrypt.hash("donato",salt);
//     const user = await db.User.create({username : 'jeorge',password : password, firstname: 'Jeorge',lastname: 'Donato',user_money: 12334});
//     console.log(user);
// })());

module.exports = function (app) {

    app.get('/', auth, async (req, res) => {
        try {
            const user = await db.User.findByPk(req.user.id);
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    app.post("/", async (req, res) => {
        const { username, password } = req.body;

        try {
            let user = await db.User.findOne({ where: { username } });

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
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