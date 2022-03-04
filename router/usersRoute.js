const router = require("express").Router();
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');
const { indexUser, saveUser, deleteUser } = require('../controllers/usersController');
const { isAuthenticated, isAuthRole } = require('../middlewares/auth/checkAuth');
const avatarUpload = require('../middlewares/users/avatarUpload');

const { addUserValidator, addUserError } = require('../middlewares/users/userValidator');
router.get('/', decorateHtmlResponse('Users'), isAuthenticated, isAuthRole, indexUser)
    .post('/', decorateHtmlResponse('Users'), isAuthenticated, avatarUpload, addUserValidator, addUserError, isAuthRole, saveUser)
    .delete('/:id', deleteUser)

module.exports = router;