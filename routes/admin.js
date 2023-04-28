const express = require('express');
const indexcontroller = require('../controllers/Admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.post ('/login', indexcontroller.admin_login);
router.get ('/authorize',auth,  indexcontroller.authorize);
router.get ('/newcampaignrequests', auth, indexcontroller.new_campaign_requests);
router.get ('/newcampaignaccepted/:id', auth, indexcontroller.new_campaign_accepted);
router.post ('/newcampaignrejected', auth, indexcontroller.new_campaign_rejected);
module.exports = router;