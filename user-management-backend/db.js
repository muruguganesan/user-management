// Imports
const mysql = require("mysql2/promise");
require("dotenv").config();

const pEnv = process.env;

// Connection String
const db = mysql.createPool({
    host: pEnv.DB_HOSTNAME || "localhost",
    database: pEnv.DB_NAME || "",
    user: pEnv.DB_USERNAME || "",
    password: pEnv.DB_PASSWORD || ""
});

// Test Connection (Async Function)
// (async () => {
//     try {
//         const connection = await db.getConnection();
//         console.log("Server is running...");
//         connection.release();
//     }
//     catch (err) {
//         console.error(`My SQL connection failed: ${err}`);
//     }
// })();

module.exports = db;