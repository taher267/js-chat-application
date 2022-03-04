exports.decorateHtmlResponse = (page_title) => (req, res, next) => {
    res.locals.html = true;
    res.locals.title = page_title;
    res.locals.loggedIn = {}
    res.locals.errors = {}
    res.locals.data = {}
    next();
}