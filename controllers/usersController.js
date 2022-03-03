const { hash } = require('bcrypt');
const User = require('../models/people');
exports.indexUser = (req, res, next) => {
    res.render('users');
}

exports.saveUser = async (req, res, next) => {
    let newUser;
    try {
        const hashPassword = await hash(req.body.password, 10);
        if (req.files && req.files.length > 0) {
            newUser = new User({
                ...req.body,
                avatar: req.files[0].filename,
                password: hashPassword
            });

        }
        else {
            newUser = new User({
                ...req.body,
                password: hashPassword
            });
        }
        const result = await newUser.save();
        res.status(201).json({
            message: "User has been added, Successfully!"
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occored!"
                }
            }
        });
        console.log(err);
    }
}

