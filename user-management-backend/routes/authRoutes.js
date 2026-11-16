const express = require("express");
const { register } = require("../controllers/authController");
const validate = require("../middleware/validate");
const { registerSchema } = require("../schemas/authSchemas");

const authRouter = express.Router();


authRouter.post("/register", validate(registerSchema), register);

module.exports = authRouter;