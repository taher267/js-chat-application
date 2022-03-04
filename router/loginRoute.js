const router = require("express").Router();
const { loginValidator, loginErrorHandler } = require('../middlewares/login/loginValidator');
const { getLogin, login, logout } = require('../controllers/loginController');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');
const { isAuthLogin, isAuthRole } = require('../middlewares/auth/checkAuth');

router.get('/', decorateHtmlResponse("Login"), isAuthLogin, getLogin)
    .post('/', decorateHtmlResponse("Inbox"), loginValidator, loginErrorHandler, login)
    .delete('/', logout);

module.exports = router;
