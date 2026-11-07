const db = require("../db");

const getAllUsers = async (req, res) => {

    try {
        const { limit=10, search="", page=1 } = req.query;
        const offset = (page - 1)*limit;
        let query = `SELECT * FROM users`;
        let countQuery = `SELECT COUNT(*) AS count FROM users`;
        let queryParams = [];
        let countParams = [];
        if(search) {
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

        res.status(200).json(
            {
                message: "Users Retrieved Successfully",
                state: true,
                status: 200,
                users: users,
                total_pages: Math.ceil(count[0].count/limit)
            }
        );
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`,
            state: true,
            status: 500
        });
    }

}

module.exports = { getAllUsers };