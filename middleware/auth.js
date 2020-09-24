const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function (req, res, cb) {
    // console.log(req)
    const token = req.header('x-auth-token');

    //Check if token does not exists or created by session
    if (!token) {
        return res.status(401).json({ msg: 'No token! Authorization denied' });
    }

    try {
        //Verify the user's token
        await jwt.verify(token, config.get('jwtSecretKey'), function (error, decoded) {
            if (error) {
                //If not verified
                res.status(401).json({ msg: 'Token is invalid!' });
            } else {
                //Include user in the request and continue with the route function
                req.user = decoded.user;
                cb();
            }
        });
    } catch (err) {
        console.log('Something wrong with the middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
}