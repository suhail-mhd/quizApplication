const jwt = require('jsonwebtoken');

const generateToken  = (id) => {
    return jwt.sign({id},'jsonwebtokenSection',{
        expiresIn:"30d",
    })
};

module.exports = generateToken;