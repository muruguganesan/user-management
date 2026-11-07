// Imports
const express = require("express");
const db = require("../db");   // CommonJS modules doesn't require extension but ESM requires

// Create Router
const router = express.Router();


// Get All Users with Pagination and Search
router.get("/", async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
    
});

module.exports = router;