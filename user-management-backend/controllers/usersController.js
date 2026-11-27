const db = require("../config/db");

const getAllUsers = async (req, res) => {

    try {
        const { limit = 10, search = "", page = 1 } = req.query;
        const offset = (page - 1) * limit;
        let query = `SELECT * FROM users`;
        let countQuery = `SELECT COUNT(*) AS count FROM users`;
        let queryParams = [];
        let countParams = [];
        if (search) {
            const searchQuery = " WHERE name LIKE ? OR email LIKE ? OR age LIKE ?";

            query += searchQuery;
            queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);

            // Count Query
            countQuery += searchQuery;
            countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }
        query += " LIMIT ? OFFSET ?";
        queryParams.push(Number(limit), Number(offset));
        countParams.push(Number(limit), Number(offset));



        const [users] = await db.query(query, queryParams);
        const [count] = await db.query(countQuery, countParams);
        const [total_users] = await db.query(`SELECT COUNT(*) AS total_users FROM users WHERE name LIKE ? OR email LIKE ? OR age LIKE ?`, [`%${search}%`, `%${search}%`, `%${search}%`]);

        res.status(200).json(
            {
                message: "Users Retrieved Successfully",
                state: true,
                status: 200,
                users: users,
                total_pages: Math.ceil(count[0].count / limit),
                total_users: total_users[0].total_users
            }
        );
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`,
            state: false,
            status: 500
        });
    }

};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await db.query(`DELETE FROM users WHERE id = ?`, [id]);
        res.status(200).json({
            message: "User Deleted Successfully",
            state: true,
            status: 200
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`,
            state: false,
            status: 500
        });
    }
};

const createUser = async (req, res) => {
    console.log("req_body", req.body);
    // console.log("filename",req.file.originalname);  
    console.log("name", req.body.name);
    const photo = req.file.originalname;
    try {
        const { name, email, age } = req.body;
        await db.query(`INSERT INTO users (name, email, age, photo) VALUES(?, ?, ?, ?)`, [name, email, age, photo]);
        res.status(200).json({
            message: "User Created Successfully",
            state: true,
            status: 201
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`,
            state: false,
            status: 500,
            data: req.body
        })
    }
}


const uploads = (req, res) => {
    console.log("filename", req.file.originalname);
    console.log("name", req.body.name);
    res.json({
        message: "Image uploaded successfully",
        file: req.file
    });
}

const viewUser = async (req, res) => {
    const id = req.params.id;
    try {
        const datas = await db.query(`SELECT * FROM users WHERE id=?`, [id]);
        res.status(200).json({
            message: `User Retrieved Successfully`,
            state: true,
            status: 200,
            data: datas[0]
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`,
            state: false,
            status: 500
        });
    }
}

// editUser

const editUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const id = req.params.id;

        // Get the existing photo from the database
        const [existingUser] = await db.query(
            `SELECT photo FROM users WHERE id = ?`,
            [id]
        );

        if (existingUser.length === 0) {
            return res.status(404).json({
                message: "User not found",
                state: false,
                status: 404
            });
        }

        // Use the new photo if uploaded; otherwise retain the existing one
        const photo = req.file
            ? req.file.filename
            : existingUser[0].photo;

        await db.query(
            `UPDATE users SET name=?, email=?, age=?, photo=? WHERE id=?`,
            [name, email, age, photo, id]
        );

        res.status(200).json({
            message: "User Updated Successfully",
            state: true,
            status: 200
        });

    } catch (error) {
        console.error("Edit User Error:", error);

        res.status(500).json({
            message: `Error: ${error.message}`,
            state: false,
            status: 500
        });
    }
};

// Get Profile
const getProfile = async (req, res) => {
    console.log("profile", req);
    try {
        const [users] = await db.query(`SELECT id, name, email, role, created_at FROM users_table WHERE id=?`, [req.user.id]);
        if (users.length === 0) {
            return res.status(404).json({
                state: false,
                status: 404,
                message: "User not Exist"
            })
        }
        return res.status(200).json({
            state: true,
            status: 200,
            message: "User Profile Retrieved Successfully",
            data: users
        });
    }
    catch (error) {
        return res.status(500).json({
            state: false,
            status: 500,
            error: `Internal Server Error: ${error.message}`
        });
    }
}


module.exports = { getAllUsers, deleteUser, createUser, uploads, viewUser, editUser, getProfile };