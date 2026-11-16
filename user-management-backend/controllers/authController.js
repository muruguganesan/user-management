const db = require("../config/db");
const bcrypt = require("bcrypt");

const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check Existing User by Email
        const [ existingUser ] = await db.query("SELECT id FROM users_table WHERE email=?", [email]);
        if(existingUser.length>0) {
            return res.status(409).json({
                state: false,
                status: 409,
                message: "Email already registered"
            })
        }

        // Create Hashed Password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert User
        const [ result ] = await db.query("INSERT INTO users_table (name, email, password) VALUES(?, ?, ?)", [name, email, hashedPassword]);

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

module.exports = { register };