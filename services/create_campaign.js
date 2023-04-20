const sqlConn = require('../db/db_connection');

const createcampaign = async (createCampaignDetails) => {
  if (!createCampaignDetails.campaign_title || !createCampaignDetails.campaign_description || !createCampaignDetails.campaign_start_time || !createCampaignDetails.campaign_end_time || !createCampaignDetails.campaign_type || !createCampaignDetails.campaign_image || !createCampaignDetails.campaign_goal ) throw new Error('Required fields cannot be empty');

  const result = await sqlConn.connection.query(`Select * from campaigner where campaigner_email= '${createCampaignDetails.c_email}'`);
  const id = result.rows[0].campaigner_id;

  // const result = await sqlConn.connection.query(`SELECT * FROM public."CAMPAIGNS"`);
  // console.log(result.rowCount)
//   if (result.rowCount > 0) throw new Error('Campaigner Already Exist.');
  // const id = result.rowCount+1;
  // console.log(`'${id}', '${createCampaignDetails.c_name}', '${createCampaignDetails.c_description}', '${createCampaignDetails.c_goal}', '${createCampaignDetails.c_story}', '${createCampaignDetails.c_factor}', '${createCampaignDetails.c_email}', '${createCampaignDetails.c_image}'`);
  console.log(`INSERT INTO campaign ("campaign_title", "campaign_description", "campaign_start_time", "campaign_end_time", "campaign_type", "campaign_image", "campaigner_id", "campaign_goal") VALUES ( '${createCampaignDetails.campaign_title}', '${createCampaignDetails.campaign_description}', '${createCampaignDetails.campaign_start_time}', '${createCampaignDetails.campaign_end_time}', '${createCampaignDetails.campaign_type}', 'Image here', ${id}, ${createCampaignDetails.campaign_goal})`);
  const insert = await sqlConn.connection.query(`INSERT INTO campaign ("campaign_title", "campaign_description", "campaign_start_time", "campaign_end_time", "campaign_type", "campaign_image", "campaigner_id", "campaign_goal") VALUES ( '${createCampaignDetails.campaign_title}', '${createCampaignDetails.campaign_description}', '${createCampaignDetails.campaign_start_time}', '${createCampaignDetails.campaign_end_time}', '${createCampaignDetails.campaign_type}', '${createCampaignDetails.campaign_image}', ${id}, ${createCampaignDetails.campaign_goal})`);
  console.log(insert)
  if (insert.rowCount === 1) console.log('Campaign Inserted Successfully.');
};

module.exports.createcampaign = createcampaign;
