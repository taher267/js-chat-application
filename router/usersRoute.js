const router = require("express").Router();
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');
const { indexUser, saveUser } = require('../controllers/usersController');
const avatarUpload = require('../middlewares/users/avatarUpload');
const { addUserValidator, addUserError } = require('../middlewares/users/userValidator');
router.get('/', decorateHtmlResponse('Users'), indexUser)
    .post('/', avatarUpload, addUserValidator, addUserError, saveUser);

module.exports = router;