// Imports
const express = require("express");
// const db = require("../db");   // CommonJS modules doesn't require extension but ESM requires
const usersController = require("../controllers/usersController");

// Create Router
const usersRoutes = express.Router();

usersRoutes.get('/', usersController.getAllUsers);


// Get All Users with Pagination and Search
// router.get("/", async (req, res) => {
//     try {

//     }
//     catch (error) {
//         res.status(500).json({error: error.message})
//     }
    
// });

module.exports = usersRoutes;