const jwt = require('jsonwebtoken')


const jwtMiddleware = (req, res, next) => {
    //extract json web token form header
    // const token = req.headers.authorization?.split(' ')[1];
    const token = req.cookies.token;
    if (!token) {
        return res.status(404).json({ "message": "Unotherized" })
    }
    try {
         jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; 
        next();
    });
       
    } catch (error) {
        res.status(401).json({ error: error.message } || { error: 'Invalid Token' })
    }
}

const generateToken = (userData) => {
    //generate a new jwt token
    return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: 300*12*12 })
}

module.exports = { jwtMiddleware, generateToken };