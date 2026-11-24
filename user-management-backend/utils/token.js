const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign({
        user_id: user.id,
        role: user.role
    },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_TIME || '15m',
            algorithm: 'HS256'
        }
    )
}

module.exports= { generateAccessToken };