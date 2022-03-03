const createError = require('http-errors');
//404 not found handler
exports.notFoundHandler = (req, res, next) => {
    next(createError(404, "Your Request couldn't found!"));
}

exports.errorHandler = (err, req, res, next) => {
    res.locals.error = process.env.NODE_ENV === 'development' ? err : { message: err.message }
    res.status(err.status || 500);
    if (res.locals.html) {
        return res.render('error/error', { title: `Error ${err.status || 500}` });
    } else {
        return res.json(res.locals.error);
    }





}

