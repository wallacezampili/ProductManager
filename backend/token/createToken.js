const jwt = require('jsonwebtoken');


module.exports = function createToken(user)
{
    const token = jwt.sign(user, 'mysecret');
    return token;
}