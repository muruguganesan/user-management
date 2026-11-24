const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check Authorization Headers
        if(!authHeader) {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Authorization token required"
            })
        }

        // Expected: Bearer <token>
        const [schema, token] = authHeader.split(" ");

        if(schema !== "Bearer" || !token) {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Invalid Authorization Format"
            })
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"]
        });

        // Attach authenticated User
        req.user = {
            id: decoded.user_id,
            role: decoded.role
        };
        next();

    }
    catch (error) {
        if(error.name==="TokenExpiredError") {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Access Token Expired"
            })
        }

        return res.status(401).json({
            state: false,
            status: 401,
            message: "Invalid Token/Expired Token"
        })
    }
}

module.exports = authMiddleware;