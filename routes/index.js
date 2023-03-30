const express = require('express');
const indexcontroller = require('../controllers/index');
const auth = require('../middleware/auth');

const   router = express.Router();

router.post ('/login', indexcontroller.campaigner_login);
router.post ('/signup', indexcontroller.campaigner_signup);
router.post ('/reset-password', indexcontroller.campaigner_resetpassword);
router.get ('/change-password/:id/:token', indexcontroller.campaigner_changepassword);
router.post ('/change-password/:id/:token', indexcontroller.campaigner_submitchangepassword);
router.get ('/authorize',auth,  indexcontroller.authorize);
router.post ('/createcampaign', auth, indexcontroller.create_campaign);
router.get ('/logout', auth, indexcontroller.logout);

module.exports = router;