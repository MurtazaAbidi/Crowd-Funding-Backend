const sqlConn = require('../db/db_connection');


const createcampaign = async (createCampaignDetails) => {
  if (!createCampaignDetails.c_name || !createCampaignDetails.c_description || !createCampaignDetails.c_factor || !createCampaignDetails.c_story || !createCampaignDetails.c_image || !createCampaignDetails.c_goal ) throw new Error('Required fields cannot be empty');

  const result = await sqlConn.connection.query(`SELECT * FROM public."CAMPAIGNS"`);
  console.log(result.rowCount)
//   if (result.rowCount > 0) throw new Error('Campaigner Already Exist.');
  const id = result.rowCount+1;
  console.log(`'${id}', '${createCampaignDetails.c_name}', '${createCampaignDetails.c_description}', '${createCampaignDetails.c_goal}', '${createCampaignDetails.c_story}', '${createCampaignDetails.c_factor}', '${createCampaignDetails.c_email}', '${createCampaignDetails.c_image}'`);
  const insert = await sqlConn.connection.query(`INSERT INTO public."CAMPAIGNS" ("C_ID", "C_NAME", "C_DESCRIPTION", "C_GOAL", "C_STORY", "C_FACTORS", "U_ID", "C_IMAGE") VALUES (${id}, '${createCampaignDetails.c_name}', '${createCampaignDetails.c_description}', ${createCampaignDetails.c_goal}, '${createCampaignDetails.c_story}', '${createCampaignDetails.c_factor}', '${createCampaignDetails.c_email}', '${createCampaignDetails.c_image}')`);
  console.log(insert)
  if (insert.rowCount === 1) console.log('Campaigner Inserted Successfully.');
};

module.exports.createcampaign = createcampaign;
