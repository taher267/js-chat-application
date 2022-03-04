const { unlink } = require('fs');
const { hash } = require('bcrypt');
const User = require('../models/people');
exports.indexUser = async (req, res, next) => {
    const users = await User.find();
    res.render('users', { users });
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
    }
}


exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        //remove avatar
        if (user.avatar) {
            unlink(`public/uploads/avatars/${user.avatar}`, (err) => {
                if (err) {
                    return res.status(505).json({
                        errors: {
                            common: {
                                msg: err.message
                            }
                        }
                    })
                }
            });
        }
        return res.status(200).json({
            delete: "User has been deleted, successfully!"
        })
    } catch (err) {
        return res.status(505).json({
            errors: {
                common: {
                    msg: "Could not delete the user!"
                }
            }
        })
    }
}
