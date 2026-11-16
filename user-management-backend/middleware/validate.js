const validate = (schema) => {
    return (req, res, next) => {
        const data = req.body;
        const result = schema.safeParse(data);
        if(!result.success) {
            res.status(400).json({
               state: false,
               status: 400,
               errors: result.error.issues.map((issue)=>({
                field: issue.path.join("."),
                message: issue.message
               }))
            });
        }
        req.body = result.data;
        next();
    }
}

module.exports = validate;