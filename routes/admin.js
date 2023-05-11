const express = require('express');
const indexcontroller = require('../controllers/Admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.post ('/login', indexcontroller.admin_login);
router.get ('/authorize',auth,  indexcontroller.authorize);
router.get ('/newcampaignrequests', auth, indexcontroller.new_campaign_requests);
router.get ('/newcampaignaccepted/:id', auth, indexcontroller.new_campaign_accepted);
router.post ('/newcampaignrejected', auth, indexcontroller.new_campaign_rejected);
router.get ('/campaignerlist', auth, indexcontroller.campaigner_list);
router.get ('/investorlist', auth, indexcontroller.investor_list);
router.get ('/timeextensionrequests', auth, indexcontroller.time_extension_requests);
router.get ('/acceptedtimeextensionrequests', auth, indexcontroller.accepted_time_extension_requests); 
router.get ('/accepttimeextendrequest/:id', auth, indexcontroller.accept_time_extend_request); 
router.post ('/rejecttimeextendrequest', auth, indexcontroller.reject_time_extend_request); 
router.get ('/rejectednewcampaignsrequest', auth, indexcontroller.rejected_new_campaigns_request); 
router.get ('/showrejectedtimeextensionrequests', auth, indexcontroller.show_rejected_time_extension_requests); // show rejected timeextension requests
router.get ('/logout', auth, indexcontroller.logout); 
module.exports = router;