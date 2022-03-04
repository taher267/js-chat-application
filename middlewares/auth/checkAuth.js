const createError = require("http-errors");
const { verify } = require("jsonwebtoken");
exports.isAuthenticated = (req, res, next) => {
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookies) {
        try {
            token = cookies[process.env.COOKIE_NAME];
            // console.log(token);
            const decoded = verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            //pass user info to response locals
            if (res.locals.html) {
                res.locals.loggedIn = decoded;
            }
            next();
        } catch (err) {
            if (res.locals.html) {
                res.redirect('/');
            } else {
                res.status(500).json({
                    errors: {
                        common: {
                            mgs: "Authentiction failure!"
                        }
                    }
                })
            }
        }
    } else {
        if (res.locals.html) {
            res.redirect('/');
        } else {
            res.status(401).json({
                error: "Authentication failure!"
            });
        }
    }
}
exports.isAuthLogin = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (!cookies) return next();
    return res.redirect('/inbox');
}

exports.isAuthRole = (req, res, next) => {
    const roles = ['user', 'author', 'contributor'];
    if (req.user.role === 'admin') {
        next();
    } else if (roles.indexOf(req.user.role) !== -1) {
        res.redirect('/inbox');
    } else {
        throw createError("Something worng");
    }

}