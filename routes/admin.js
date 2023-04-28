const express = require('express');
const indexcontroller = require('../controllers/Admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.post ('/login', indexcontroller.admin_login);
router.get ('/authorize',auth,  indexcontroller.authorize);
router.get ('/campaignrequests', auth, indexcontroller.campaign_requests);
module.exports = router;