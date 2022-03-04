const User = require("../models/people");
const { compare } = require('bcrypt');
const { sign } = require("jsonwebtoken");
const createError = require("http-errors");

exports.getLogin = (req, res, next) => {
    res.render('index');
}


exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    const roles = ['admin', 'user', 'author', 'contributor'];
    try {
        const user = await User.findOne({ $or: [{ email: username }, { mobile: username }] });

        if (user !== null && roles.indexOf(user.role) === -1) {
            throw createError('Something went wrong');
        }

        if (user && user._id) {
            const isValidPass = await compare(password, user.password);
            if (isValidPass) {
                const userObj = {
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role,
                };
                const token = sign(userObj, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
                //set cookie
                res.cookie(process.env.COOKIE_NAME, token,
                    {
                        maxAge: process.env.JWT_EXPIRE,
                        httpOnly: true,
                        signed: true
                    });
                res.locals.loggedIn = userObj;
                if (user.role === 'admin') {
                    return res.render('users', { users: await User.find() });
                } else {

                    return res.render('inbox');
                }
            } else {
                throw createError("Login failed, Please try again")
            }
        }
        else {
            throw createError("Login failed, Please try again")
        }
    } catch (err) {
        res.render('index', {
            data: {
                username
            },
            errors: {
                common: {
                    msg: err.message
                }
            }
        });
    }

    // res.render('index');
}

exports.logout = async (req, res, next) => {
    try {
        await res.clearCookie(process.env.COOKIE_NAME);
        res.send('Logged out!');
    } catch (err) {
        throw createError("something problem")
    }
}