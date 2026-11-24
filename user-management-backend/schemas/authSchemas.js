const { z } = require("zod");

const passwordPolicy = z.string()
    .min(1, "Password is required")
    .min(8, "Password must contain at least 8 characters")
    .max(72, "Password is too long")
    .regex(/[A-Z]/, "At least one uppercase letter required")
    .regex(/[a-z]/, "At least one lowercase letter required")
    .regex(/[0-9]/, "At least one numeric is required")
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/, "At least one special character is required");

const registerSchema = z.object({
    name: z.string().trim()
        .min(1, "Name is required")
        .min(3, "Name must contain at least 3 characters")
        .max(100, "Name should not be more than 50 Characters"),

    email: z.string().trim()
        .min(1, "Name is required")
        .email("Invalid Email Address"),

    password: passwordPolicy,
    confirmPassword: passwordPolicy
}).refine((data)=>data.password===data.confirmPassword,{
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

const loginSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email("Invalid Email address"),
    password: z.string().min(1, "Password is required")
});

const refreshSchema = z.object({
    refreshToken: z.string().min(1).max(4096)
});



module.exports = { registerSchema, loginSchema, refreshSchema };