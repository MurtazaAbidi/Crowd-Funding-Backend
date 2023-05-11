const { addComment } = require('../services/Campaigner/add_comment');
const { campaignExtensionRequest } = require('../services/Campaigner/campaign_extension_request');
const { campaignerchangepassword } = require('../services/Campaigner/campaigner_changepassword');
const { campaignerlogin } = require('../services/Campaigner/campaigner_login');
const { campaignerresetpassword } = require('../services/Campaigner/campaigner_resetpassword');
const { campaignersignup } = require('../services/Campaigner/campaigner_signup');
const { campaignersubmitchangepassword } = require('../services/Campaigner/campaigner_submitchangepassword');
const { createcampaign } = require('../services/Campaigner/create_campaign');
const { getCampaignDetails } = require('../services/Campaigner/get_campaign_details');
const { getComments } = require('../services/Campaigner/get_comments');
const { getProfile } = require('../services/Campaigner/get_profile');
const { showCampaign } = require('../services/Campaigner/show_campaign');
const { showMyCampaign } = require('../services/Campaigner/show_my_campaign');
const { updateProfile } = require('../services/Campaigner/update_profile');


module.exports.campaigner_signup = async (req, res) => {
  console.log(req.body)
  try {
    const signupDetails = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      cnic: req.body.cnic,
      officeAddress: req.body.officeAddress
    };

    await campaignersignup(signupDetails);
    return res.status(200).send('Campaigner Inserted.');
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};

module.exports.campaigner_resetpassword = async (req, res) => {
  console.log(req.body)
  try {
    const email = req.body.email;
    await campaignerresetpassword(email);
    return res.status(200).send('Email Send Successfully.');
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};

module.exports.campaigner_changepassword = async (req, res) => {
  try {
    const changePasswordDetails = {
      email: req.params.id,
      token: req.params.token
    };

    await campaignerchangepassword(changePasswordDetails);
    // return res.status(200).send('Campaigner Inserted.');
    res.render('change-password', { email: changePasswordDetails.email })
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
}
module.exports.campaigner_submitchangepassword = async (req, res) => {
  try {
    const paramsDetails = {
      email: req.params.id,
      token: req.params.token
    };
    changePasswordDetails = {
      password: req.body.password,
      changePassword: req.body.password2
    }
    // res.send(req.body)
    // return
    await campaignersubmitchangepassword(paramsDetails, changePasswordDetails);
    return res.status(200).send('Password Changed Successfully.');
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
}

module.exports.campaigner_login = async (req, res) => {
  console.log(req.body);
  // console.log(req.body.email);
  // console.log(req.body.password);
  try {
    const loginDetails = {
      email: req.body.email,
      password: req.body.password,
    };

    const token = await campaignerlogin(loginDetails);

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

module.exports.create_campaign = async (req, res) => {
  console.log(req.body);
  // console.log(email)
  try {

    let mileStones = req.body.milestonesData;
    let duration = 0
    mileStones.forEach(element => {
      duration += element.duration
    });
    let start_date = new Date();
    let end_date = new Date();
    end_date.setDate(start_date.getDate() + duration)


    const createCampaignDetails = {
      c_email: req.body.email,
      campaign_title: req.body.title,
      campaign_start_time: (start_date.getFullYear()+'-'+Number(start_date.getMonth()+1)+'-'+start_date.getDate()+" "+start_date.getHours()+':'+start_date.getMinutes()+':'+start_date.getSeconds()),
      campaign_end_time: (end_date.getFullYear()+'-'+Number(end_date.getMonth()+1)+'-'+end_date.getDate()+" "+end_date.getHours()+':'+end_date.getMinutes()+':'+end_date.getSeconds()),
      campaign_description: req.body.projectDescription,
      campaign_goal: req.body.goalAmount,
      campaign_milestones_data: req.body.milestonesData,
      campaign_image: req.body.picture[0],
      campaign_type: req.body.InvestmentType,
      campaign_type_details: req.body.InvestmentTypeDetails,
      campaign_Profit_percentage: req.body.profitPercentage,
    };
    console.log(createCampaignDetails)

    await createcampaign(createCampaignDetails);
    return res.status(200).send('Campaign Created Request Sent Successfully to Admin.');
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};

module.exports.show_campaign = async (req, res) => {
  
  try {
    let response = await showCampaign();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};

module.exports.show_my_campaign = async (req, res) => {
  console.log(req.body)
  try {
    const email = req.body.email;
    let response = await showMyCampaign(email);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};

module.exports.get_campaign_details = async (req, res) => {
  try {
    const id = req.params.id;
    let response = await getCampaignDetails(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};

module.exports.get_comments = async (req, res) => {
  try {
    const id = req.params.id;
    let response = await getComments(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};


module.exports.add_comment = async (req, res) => {
  console.log(req.body);
  // console.log(email)
  try {

    let date = new Date();

    const addCommentData = {
      comment_msg: req.body.comment_msg,
      campaign_id: req.body.campaign_id,
      comment_date: (date.getFullYear()+'-'+Number(date.getMonth()+1)+'-'+date.getDate()+" "+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()),
      campaigner_id: req.body.campaigner_id,
    };
    console.log(addCommentData)

    await addComment(addCommentData);
    return res.status(200).send('campaign Created Successfully.');
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};

module.exports.get_profile = async (req, res) => {
  try {
    let response = await getProfile(req.body.email);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};

module.exports.update_profile = async (req, res) => {
  // console.log(email)
  try {

    const profileData = {
      email: req.body.email,
      campaigner_name: req.body.campaigner_name,
      campaigner_cnic: req.body.campaigner_cnic,
      campaigner_contact: req.body.campaigner_contact,
      campaigner_image: req.body.campaigner_image,
      office_address: req.body.office_address,
    };
    console.log(profileData)

    await updateProfile(profileData);
    return res.status(200).send('Campaigner Updated Successfully.');
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};

module.exports.campaign_extension_request = async (req, res) => {
  try {

    await campaignExtensionRequest(req.params.id);
    return res.status(200).send("Campaign Time Extend Request Sent Successfully");
  } catch (error) {
    return res.status(401).json({ msg: error.message });
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

