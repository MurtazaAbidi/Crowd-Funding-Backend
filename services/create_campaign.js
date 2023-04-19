const sqlConn = require('../db/db_connection');

const createcampaign = async (createCampaignDetails) => {
  if (!createCampaignDetails.campaign_title || !createCampaignDetails.campaign_description || !createCampaignDetails.campaign_start_time || !createCampaignDetails.campaign_end_time || !createCampaignDetails.campaign_type || !createCampaignDetails.campaign_image || !createCampaignDetails.campaigner_id || !createCampaignDetails.campaign_goal ) throw new Error('Required fields cannot be empty');

  // const result = await sqlConn.connection.query(`SELECT * FROM public."CAMPAIGNS"`);
  // console.log(result.rowCount)
//   if (result.rowCount > 0) throw new Error('Campaigner Already Exist.');
  // const id = result.rowCount+1;
  // console.log(`'${id}', '${createCampaignDetails.c_name}', '${createCampaignDetails.c_description}', '${createCampaignDetails.c_goal}', '${createCampaignDetails.c_story}', '${createCampaignDetails.c_factor}', '${createCampaignDetails.c_email}', '${createCampaignDetails.c_image}'`);
  const insert = await sqlConn.connection.query(`INSERT INTO public."CAMPAIGNS" ("campaign_title", "campaign_description", "campaign_start_time", "campaign_end_time", "campaign_type", "campaign_image", "campaigner_id", "campaign_goal") VALUES ( '${createCampaignDetails.campaign_title}', '${createCampaignDetails.campaign_description}', ${createCampaignDetails.campaign_start_time}, '${createCampaignDetails.campaign_end_time}', '${createCampaignDetails.campaign_type}', '${createCampaignDetails.campaign_image}', '${createCampaignDetails.campaigner_id}', '${createCampaignDetails.campaign_goal}',)`);
  console.log(insert)
  if (insert.rowCount === 1) console.log('Campaigner Inserted Successfully.');
};

module.exports.createcampaign = createcampaign;
