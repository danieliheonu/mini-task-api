const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try{
        let token = req.headers.authorization;
        if(!token) return res.status(401).send({success: false, message: "token not found"});
        token.includes('Bearer') ? token = token.slice('Bearer'.length).trim() : token = token.trim();
        const loggedUser = jwt.verify(token, process.env.TOKEN_KEY);
        res.cookie('loggedUser', loggedUser.userId, {expire: 360000 + Date.now()}); 
        next()
    } catch (error) {
        res.status(401).send({success: false, message: error.message});
    }
};

module.exports = verifyToken;