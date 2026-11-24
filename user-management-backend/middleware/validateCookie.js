const validateCookie = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.cookies);
        if (!result.success) {
            return res.status(401).json({
                state: false,
                status: 401,
                message: "Refresh token required"
            });
        }
        req.cookies = result.data;
        next();
    };
};

module.exports = validateCookie;