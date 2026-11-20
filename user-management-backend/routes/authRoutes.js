const express = require("express");
const { register, login } = require("../controllers/authController");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../schemas/authSchemas");

const authRouter = express.Router();


authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);


module.exports = authRouter;