const {campaignerlogin} = require('../services/campaigner_login');
const { campaignersignup } = require('../services/campaigner_signup');
const { createcampaign } = require('../services/create_campaign');


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
    return res.status(200).json({ msg: 'User is Authorized'});
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }
};

module.exports.create_campaign = async (req, res)=>{
  console.log (req.body);
  // console.log(email)
  try {
    const createCampaignDetails = {
      c_email: req.body.email,
      c_name: req.body.title,
      c_description: req.body.subtitle,
      c_factor: req.body.risk,
      c_story: req.body.projectDescription,
      c_image: req.body.picture,
      c_goal: req.body.goalAmount,
    };
    // console.log(createCampaignDetails)

    await createcampaign(createCampaignDetails);
    return res.status(200).send('campaign Created Successfully.');
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
};

