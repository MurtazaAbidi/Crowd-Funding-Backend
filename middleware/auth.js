const jwt = require('jsonwebtoken')
require('dotenv').config();

const auth = (req, res, next) => {
    // const token=req.header('auth')
    const token = req.cookies.auth;
    console.log(token)
    if (!token) return res.status(401).send('session Expired: Login Again...........');

    try{
        const decoded = jwt.verify(token, process.env.jwtPrivateKey)
        req.body.email = decoded.email;
        console.log(req.body?'Authorized: '+req.body.email:'UnAuthorized')
        next();
    } catch (ex) {
        return res.status(400).send('Session Expired: Login Again');
    }
    return 0;
}

module.exports = auth; 


