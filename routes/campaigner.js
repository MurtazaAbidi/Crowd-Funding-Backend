const express = require('express');
const indexcontroller = require('../controllers/Campaigner');
const auth = require('../middleware/auth');

const router = express.Router();

router.post ('/login', indexcontroller.campaigner_login);
router.post ('/signup', indexcontroller.campaigner_signup);
router.post ('/reset-password', indexcontroller.campaigner_resetpassword);
router.get ('/change-password/:id/:token', indexcontroller.campaigner_changepassword);
router.post ('/change-password/:id/:token', indexcontroller.campaigner_submitchangepassword);
router.get ('/authorize',auth,  indexcontroller.authorize);
router.post ('/createcampaign', auth, indexcontroller.create_campaign);
router.get ('/showcampaigns', auth, indexcontroller.show_campaign);
router.get ('/showmycampaigns', auth, indexcontroller.show_my_campaign);
router.get ('/getcampaigndetails/:id', auth, indexcontroller.get_campaign_details);
router.get ('/getcomments/:id', auth, indexcontroller.get_comments);
router.post ('/addcomment', auth, indexcontroller.add_comment);
router.get ('/profile', auth, indexcontroller.get_profile);
router.put ('/updateprofile', auth, indexcontroller.update_profile);
router.get ('/campaignextensionrequest/:id', auth, indexcontroller.campaign_extension_request);
router.get ('/logout/:id', auth, indexcontroller.logout);

module.exports = router;