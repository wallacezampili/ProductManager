const getToken = require('./getToken');
const jwt = require('jsonwebtoken');


module.exports = function verifyToken(req, res, next)
{  
  
    if(!req.headers)
    {
        return res.status(401).json({message: "Access Denied!"});
    }

    if(!req.headers.authorization)
    {
        return res.status(401).json({message: "Access Denied!"});
    }

    //Get token from Header
    const token = getToken(req, res);

    //Check if the token is valid
    try{
        jwt.verify(token, 'mysecret');
    }
    catch{
        return res.status(401).json({message: "Invalid Token!"});
    }

    next();

}