const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateAccessToken = (user) => {
    return jwt.sign({
        role: user.role,
        user_id: String(user.id),
    },
        process.env.JWT_SECRET,
        {

            expiresIn: process.env.JWT_EXPIRES_TIME || '15m',
            algorithm: 'HS256'
        }
    )
}

const generateRefreshToken = (user, family_id) => {
    return jwt.sign(
        {
            family_id,
            user_id: String(user.id),
            role: user.role
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: `${Number(process.env.JWT_REFRESH_DAYS || 7)}d`,
            algorithm: "HS256"
        }
    )
}

const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest('hex');
}

module.exports = { generateAccessToken, generateRefreshToken, hashToken };