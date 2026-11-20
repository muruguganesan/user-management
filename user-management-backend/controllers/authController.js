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


const login = async (req, res) => {
    console.log("req body", req.body);
    try {
        const { email, password } = req.body;

        // Check User exist or not
        const [users] = await db.query('SELECT id, name, email, role, password FROM users_table WHERE email=?', [email]);
        if(users.length===0) {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Invalid Credentials"
            });
        }

        const user = users[0];
        // Check for Password correct or not
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Invalid Credentials"
            });
        }
        return res.status(200).json({
            state: true,
            status: 200,
            message: "Login Successful",
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

module.exports = { register, login};