// Imports
const express = require("express");
// const db = require("../db");   // CommonJS modules doesn't require extension but ESM requires
const usersController = require("../controllers/usersController");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        // const uniqueName = crypto.randomUUID();
        // const extension = path.extname(file.originalname);

        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Create Router
const usersRoutes = express.Router();

usersRoutes.get('/', usersController.getAllUsers);
usersRoutes.delete('/:id', usersController.deleteUser);
usersRoutes.post('/', upload.single("photo"), usersController.createUser);
usersRoutes.post('/uploads', upload.single("image"), usersController.uploads);
usersRoutes.get('/:id', usersController.viewUser);
usersRoutes.put('/:id', upload.single("photo"), usersController.editUser);







// Get All Users with Pagination and Search
// router.get("/", async (req, res) => {
//     try {

//     }
//     catch (error) {
//         res.status(500).json({error: error.message})
//     }
    
// });

module.exports = usersRoutes;