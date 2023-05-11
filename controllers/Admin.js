const { adminLogin } = require('../services/Admin/admin_login');
const { campaignRequest } = require('../services/Admin/campaign_request');
const { newCampaignAccepted } = require('../services/Admin/new_campaign_accepted');
const { newCampaignRejected } = require('../services/Admin/new_campaign_rejected');
const { campaignerList } = require('../services/Admin/campaigner_list');
const { investorList } = require('../services/Admin/investor_list');
const { acceptTimeExtendRequest } = require('../services/Admin/accept_time_extend_request');
const { timeExtensionRequest } = require('../services/Admin/time_extension_request');
const { showRejectedTimeExtensionRequests } = require('../services/Admin/show_rejected_time_extension_requests');
const { rejectTimeExtendRequest } = require('../services/Admin/reject_time_extend_request');
const { acceptedTimeExtensionRequests } = require('../services/Admin/acceptedTimeExtensionRequests');
const { rejectedNewCampaignsRequest } = require('../services/Admin/rejected_new_campaigns_request');


module.exports.admin_login = async (req, res) => {
    console.log(req.body)
    try {
        const loginDetails = {
            email: req.body.email,
            password: req.body.password,
        };

        const token = await adminLogin(loginDetails);
        // res.set('Access-Control-Allow-Origin', "*");
        // res.set('Access-Control-Allow-Credentials', 'true');
        // res.set('Access-Control-Expose-Headers', 'date,etag,access-control-allow-origin,access-control-allow-credentials');
        res.cookie('auth', token, { httpOnly: true, sameSite: true });
        return res.header('auth', token).status(200).send('Welcome :)');
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
}

module.exports.authorize = async (req, res) => {
    try {
        return res.status(200).json({ msg: 'User is Authorized' });
    } catch (error) {
        return res.status(401).json({ msg: error.message });
    }
};

module.exports.new_campaign_requests = async (req, res) => {
    try {
        let response = await campaignRequest();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.new_campaign_accepted = async (req, res) => {
    try {
        console.log(req.params.id)
        await newCampaignAccepted(req.params.id);
        return res.status(200).send('Campaign accepted successfully');
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.new_campaign_rejected = async (req, res) => {
    try {
        const rejectedCampaignData = {
            id: req.body.id,
            rejectedMessage: req.body.rejectedMessage,
        };
        await newCampaignRejected(rejectedCampaignData);
        return res.status(200).send('Campaign rejected successfully');
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.campaigner_list = async (req, res) => {
    try {
        let response = await campaignerList();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.investor_list = async (req, res) => {
    try {
        let response = await investorList();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.time_extension_requests = async (req, res) => {
    try {
        let response = await timeExtensionRequest();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.accepted_time_extension_requests = async (req, res) => {
    try {
        let response = await acceptedTimeExtensionRequests();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.accept_time_extend_request = async (req, res) => {
    try {
        await acceptTimeExtendRequest(req.params.id);
        return res.status(200).send('Campaign Time Extended for 15 days successfully');
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.reject_time_extend_request = async (req, res) => {
    try {
        await rejectTimeExtendRequest(req.body.id, req.body.rejectedMessage);
        return res.status(200).send('Time Extended Request Rejected Successfully');
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.rejected_new_campaigns_request = async (req, res) => {
    try {
        let response = await rejectedNewCampaignsRequest();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.show_rejected_time_extension_requests = async (req, res) => {
    try {
        let response = await showRejectedTimeExtensionRequests();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('auth');
        return res.status(200).send("Campaigner Successfully Logged out");
    } catch (error) {
        return res.status(401).json({ msg: error.message });
    }
};

