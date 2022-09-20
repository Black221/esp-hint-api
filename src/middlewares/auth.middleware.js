const jwt = require('jsonwebtoken');


module.exports.verifyAuth = (req, res, next) => {
    next()
};

module.exports.requireAuth = (req, res, next) => {
    const bearerToken = req.headers["authorization"];

    if (!bearerToken) {
        return res.status(403).send("A token is required for authentication");
    }
    const token = bearerToken.split(' ')[1];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    if (token) {
        jwt.verify(
            token, process.env.TOKEN_SECRET,'', async (err, decodedToken) => {
                if (err) {
                    res.status(401).send({message : "require auth"})
                } else {
                    req.auth = {
                        user : decodedToken.user
                    };
                    next();
                }
            });
    } else {
        console.log('No token');
    }
}