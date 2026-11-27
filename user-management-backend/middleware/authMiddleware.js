const jwt = require("jsonwebtoken");
const db = require("../config/db");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("authHeader", authHeader);

        // Check Authorization Headers
        if (!authHeader) {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Authorization token required"
            })
        }

        // Expected: Bearer <token>
        const [schema, token] = authHeader.split(" ");

        if (schema !== "Bearer" || !token) {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Invalid Authorization Format"
            })
        }

        console.log("token", token);

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"]
        });
        console.log("decoded", decoded);

        // Get current token version from database
        const [users] = await db.query('SELECT id, role, token_version FROM users_table WHERE id=?', [decoded.user_id]);

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const user = users[0];
        console.log("user", user);

        console.log("decoded new", decoded);
        console.log("decoded new number", typeof decoded.tokenVersion);

        console.log("user new", user);
          // Check token version
        if (
            Number(decoded.token_version) !==
            Number(user.token_version)
        ) {
            return res.status(401).json({
                success: false,
                message: "Access token revoked. Please login again."
            });
        }



        const [revokedTokens] = await db.query('SELECT id FROM revoked_access_tokens WHERE jti=?', [decoded.jti]);
        if (revokedTokens.length > 0) {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Access token revoked"
            });
        }

        console.log("revokedTokens", revokedTokens);


        // Attach authenticated User
        req.user = {
            id: decoded.user_id,
            role: decoded.role
        };
        next();

    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Access Token Expired"
            })
        }

        return res.status(401).json({
            state: false,
            status: 401,
            message: `Invalid Token/Expired Token: ${error.message}`
        })
    }
}

module.exports = authMiddleware;