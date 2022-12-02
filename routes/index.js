const express = require('express');
const indexcontroller = require('../controllers/index');
const auth = require('../middleware/auth');

const router = express.Router();

router.post ('/login', indexcontroller.campaigner_login);
router.post ('/signup', indexcontroller.campaigner_signup);
router.get ('/authorize',auth,  indexcontroller.authorize);
router.post ('/createcampaign', auth, indexcontroller.create_campaign);

module.exports = router;