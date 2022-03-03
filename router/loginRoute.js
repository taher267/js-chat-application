const router = require("express").Router();
const { getLogin, postLogin } = require('../controllers/loginController');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');

router.get('/', decorateHtmlResponse("Login"), getLogin)
    .post('/', decorateHtmlResponse("Login"), postLogin);

module.exports = router;
