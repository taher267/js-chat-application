const { check, validationResult } = require("express-validator");
exports.loginValidator = [
    check('username')
        .not()
        .isEmpty()
        .withMessage("Username is required!"),
    check('password')
        .not()
        .isEmpty()
        .withMessage("Password is required!"),

];
exports.loginErrorHandler = (req, res, next) => {
    const errors = validationResult(req).mapped();
    if (Object.keys(errors).length === 0) {
        next();
    } else {
        res.render('index', {
            data: {
                username: req.body.username
            },
            errors
        });
    }
}