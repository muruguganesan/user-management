const express = require("express");
const { register, login, refreshAccessToken, logout, logoutAll } = require("../controllers/authController");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema, refreshSchema } = require("../schemas/authSchemas");
const validateCookie = require("../middleware/validateCookie");

const authRouter = express.Router();


authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/refresh", validateCookie(refreshSchema), refreshAccessToken);
authRouter.post('/logout', logout);
authRouter.post('/logout-all', logoutAll);

// logoutAll

// refreshAccessToken


module.exports = authRouter;