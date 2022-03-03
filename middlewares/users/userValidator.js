const { check, validationResult } = require("express-validator");
const { unlink } = require('fs');
const createError = require("http-errors");
const path = require("path");
const User = require('../../models/people');

exports.addUserValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is requrired")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not be anything other than alphabet")
        .isLength({ min: 5, max: 30 })
        .withMessage('Name must be between 5 to 30 chars')
        .trim(),
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is requrired")
        .isEmail()
        .withMessage("Provide a valid email address!")
        .trim()
        .custom(async (val) => {
            try {
                const user = await User.findOne({ email: val });
                if (user) {
                    throw createError("Email already used!");
                }
            } catch (err) {
                console.log(err);
                throw createError(err.message);
            }
        }),
    check("mobile")
        .not()
        .isEmpty()
        .withMessage("Mobile no is requrired!")
        .isMobilePhone("bn-BD", { strictMode: true })
        .withMessage("Mobile no must be a valid bangladesh Mobile no with +88")
        .custom(async (val) => {
            try {
                const user = await User.findOne({ mobile: val });
                if (user) {
                    throw createError("Mobile already used!");
                }
            } catch (err) {
                console.log(err);
                throw createError(err.message);
            }
        }),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password no is requrired!")
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters logn & should s=cotain at least 1 lowercase(a), 1 uppercase(A), 1 number(1) & 1 symbol (@)")
];

exports.addUserError = (req, res, next) => {
    const errors = validationResult(req).mapped();
    if (Object.keys(errors).length === 0) {
        next();
    } else {
        //remove upload file
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink('public/uploads/avatars/' + filename,
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        }
        //Response the error
        res.status(500).json({
            errors: errors
        });
    }
}