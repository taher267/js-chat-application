const router = require("express").Router();
const { getInbox } = require('../controllers/inboxController');
const { isAuthenticated } = require('../middlewares/auth/checkAuth');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');

router.get('/', decorateHtmlResponse('Inbox'), isAuthenticated, getInbox);

module.exports = router;