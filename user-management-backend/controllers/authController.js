const db = require("../config/db");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken, hashToken } = require("../utils/token");
const crypto = require("crypto");
const { refreshCookieOptions } = require("../utils/cookie");
const jwt = require("jsonwebtoken");
const { logoutSchema } = require("../schemas/authSchemas");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check Existing User by Email
        const [existingUser] = await db.query("SELECT id FROM users_table WHERE email=?", [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({
                state: false,
                status: 409,
                message: "Email already registered"
            })
        }

        // Create Hashed Password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert User
        const [result] = await db.query("INSERT INTO users_table (name, email, password) VALUES(?, ?, ?)", [name, email, hashedPassword]);

        return res.status(201).json({
            state: true,
            status: 201,
            message: "User Created Successfully",
            data: {
                id: result.insertId,
                name,
                email
            }
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            state: false,
            status: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
}


const login = async (req, res) => {
    console.log("req body", req.body);
    try {
        const { email, password } = req.body;

        // Check User exist or not
        const [users] = await db.query('SELECT id, name, email, role, password, token_version FROM users_table WHERE email=?', [email]);
        if (users.length === 0) {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Invalid Credentials"
            });
        }

        const user = users[0];
        // Check for Password correct or not
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Invalid Credentials"
            });
        }

        // Email OTP Verification for MFA (6 digit)

        // Check OTP, Expiry and Attempt Limits


        // Generate Access Token and Refresh Token
        // Generate Token Family ID
        const family_id = crypto.randomUUID();

        // Generate Access Token
        const access_token = generateAccessToken(user);

        // Generate Refresh Token
        const refresh_token = generateRefreshToken(user, family_id);

        // Hash Refresh Token
        const hashed_refresh_tok = hashToken(refresh_token);

        // Store Hash in MySQL - refresh_tokens table
        await db.query(`INSERT INTO refresh_tokens (user_id, token_hash, family_id, expires_at) 
            VALUES (?, ?, ?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL ? DAY))`, [user.id, hashed_refresh_tok, family_id, Number(process.env.JWT_REFRESH_DAYS || 7)]);

        // Send Refresh Token using HTTP only cookie
        res.cookie("refreshToken", refresh_token, refreshCookieOptions);

        return res.status(200).json({
            state: true,
            status: 200,
            message: "Login Successful",
            access_token,
            // refresh_token,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            state: false,
            status: 500,
            message: `Internal Server Error: ${error.message}`
        })
    }
}

const refreshAccessToken = async (req, res) => {
    const oldRefeshToken = req.cookies.refreshToken;
    console.log("oldRefeshToken", oldRefeshToken);
    if (!oldRefeshToken) {
        return res.status(401).json({
            state: false,
            status: 401,
            message: "Refresh Token Required"
        });
    }

    let decoded;
    try {
        decoded = jwt.verify(oldRefeshToken, process.env.JWT_REFRESH_SECRET, {
            algorithms: ["HS256"]
        });
    }
    catch (error) {
        console.error("JWT verification error:", error.name, error.message);
        return res.status(401).json({
            state: false,
            status: 401,
            message: "Invalid or Expired Refresh Token"
        })
    }


    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        const oldHashRefreshToken = hashToken(oldRefeshToken);

        // Lock the Token Record during Rotation
        const [tokens] = await connection.query('SELECT * FROM refresh_tokens WHERE token_hash=? FOR UPDATE', [oldHashRefreshToken]);

        // If Token is not there
        if (tokens.length === 0) {
            await connection.query('UPDATE refresh_tokens SET revoked_at=COALESCE(revoked_at, UTC_TIMESTAMP()) WHERE family_id=?', [decoded.family_id]);
            await connection.commit();
            res.clearCookie("refreshToken", refreshCookieOptions);
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Refresh Token Reuse Detected or Invalid Token"
            });
        }

        const oldRecord = tokens[0];

        // Validate Token Ownership and family
        if (String(oldRecord.user_id) !== String(decoded.user_id) ||
            oldRecord.family_id !== decoded.family_id) {
            await connection.rollback();
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Invalid Token"
            })
        }

        // Detect reused token
        if (oldRecord.revoked_at || oldRecord.replaced_by) {
            await connection.query('UPDATE refresh_tokens SET revoked_at=COALESCE(revoked_at, UTC_TIMESTAMP()) WHERE family_id=?', [oldRecord.family_id]);
            await connection.commit();
            res.clearCookie("refreshToken", refreshCookieOptions);
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Refresh token reuse detected"
            })
        }

        // Check Database Expirty
        if (new Date(oldRecord.expires_at).getTime() <= Date.now()) {
            await connection.rollback();
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Refresh token expired"
            })
        }

        // Get Current User
        const [users] = await connection.query('SELECT id, name, email, role, token_version FROM users_table WHERE id=?', [oldRecord.user_id]);

        if (users.length === 0) {
            await connection.rollback();
            return res.status(404).json({
                state: false,
                status: 404,
                message: "User Not found"
            })
        }

        const user = users[0];
        // Generate New Access Token
        const newAccessToken = generateAccessToken(user);
        // Generate New Refresh Token
        const newRefreshToken = generateRefreshToken(user, oldRecord.family_id);
        // Generate New Hashed Refresh Token
        const newHashedRefreshToken = hashToken(newRefreshToken);

        // Insert Replacement Token
        await connection.query('INSERT INTO refresh_tokens (user_id, token_hash, family_id, expires_at) VALUES(?, ?, ?, DATE_ADD(UTC_TIMESTAMP, INTERVAL ? DAY ))',
            [oldRecord.user_id, newHashedRefreshToken, oldRecord.family_id, Number(process.env.JWT_REFRESH_DAYS || 7)]);


        // Revoke Old Token
        await connection.query('UPDATE refresh_tokens SET revoked_at=UTC_TIMESTAMP(), replaced_by=? WHERE id=?', [newHashedRefreshToken, oldRecord.id]);

        await connection.commit();

        res.cookie("refreshToken",
            newRefreshToken,
            refreshCookieOptions
        );

        return res.status(200).json({
            state: true,
            status: 200,
            message: "Token Refreshed Successfully",
            accessToken: newAccessToken
        });
    }
    catch (error) {

        res.status(500).json({
            state: false,
            status: 500,
            message: `Internal server Error: ${error.message}`
        })
    }
    finally {
        connection.release();
    }
}

const logout = async (req, res) => {
    const cookies = req.cookies;
    const result = logoutSchema.safeParse(cookies);
    const refreshToken = result.success ? result.data.refreshToken : undefined;

 console.log("refreshTokeneeeee", refreshToken);

    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader?.split(" ")[1];
        console.log("accessTokeneee", accessToken);

        if (accessToken) {
            const decoded = jwt.verify(
                accessToken,
                process.env.JWT_SECRET
            );

            console.log("decoded access token", decoded);

            await db.query(
                `INSERT INTO revoked_access_tokens (jti, expires_at)
                 VALUES (?, FROM_UNIXTIME(?))`,
                [decoded.jti, decoded.exp]
            );
        }

        // Revoke refresh token in your existing implementation
        // and clear its cookie.
        if (refreshToken) {
            const envSecret = process.env.JWT_REFRESH_SECRET
            let decoded;
            try {
                decoded = jwt.verify(refreshToken, envSecret, {
                    algorithms: ["HS256"]
                });
            }
            catch (error) {
                console.error("JWT Error: ", error);
            }
            if (decoded.family_id && decoded.user_id) {
                console.log("decoded", decoded);
                await db.query('UPDATE refresh_tokens SET revoked_at=COALESCE(revoked_at, UTC_TIMESTAMP()) WHERE user_id = ? AND family_id=?', [decoded.user_id, decoded.family_id]);
            }
        }

        // Clear the browser cookie, even if it was missing or invalid.
        const { maxAge, ...clearOptions } = refreshCookieOptions;
        res.clearCookie("refreshToken", clearOptions);
        return res.status(200).json({
            state: true,
            status: 200,
            message: "Logged Out Successfully"
        });
    }
    catch (error) {
        const { maxAge, ...clearOptions } = refreshCookieOptions;
        res.clearCookie("refreshToken", clearOptions);

        return res.status(500).json({
            state: false,
            status: 500,
            message: `Unable to complete logout - Error: ${error.message}`
        })

    }
}

const logoutAll = async (req, res) => {
    const connection = await db.getConnection();
    console.log("req user", req.user);

    try {
        // Get authenticated user ID from access token middleware
        const userId = req.user.user_id;
        console.log("user_id", userId);
        console.log("user", req.user);

        await connection.beginTransaction();

        console.log("Revoke all existing access tokens start");
        // 1. Revoke all existing access tokens
        await connection.query(
            `UPDATE users_table
             SET token_version = token_version + 1
             WHERE id = ?`,
            [userId]
        );

        console.log("Revoke all refresh tokens across devices start");

        // 2. Revoke all refresh tokens across devices
        await connection.query(
            `UPDATE refresh_tokens
             SET revoked_at = COALESCE(revoked_at, UTC_TIMESTAMP())
             WHERE user_id = ?`,
            [userId]
        );

        await connection.commit();

        // 3. Clear current browser refresh cookie
        const { maxAge, ...clearOptions } = refreshCookieOptions;

        res.clearCookie("refreshToken", clearOptions);
console.log("Logout all device success");
        return res.status(200).json({
            state: true,
            status: 200,
            message: "Logged out successfully from all devices"
        });

    } catch (error) {

        await connection.rollback();

        console.error("Logout all error:", error);

        const { maxAge, ...clearOptions } = refreshCookieOptions;
        res.clearCookie("refreshToken", clearOptions);

        return res.status(500).json({
            state: false,
            status: 500,
            message: `Unable to complete logout: ${error.message}`
        });

    } finally {
        connection.release();
    }
};

module.exports = { register, login, refreshAccessToken, logout, logoutAll };