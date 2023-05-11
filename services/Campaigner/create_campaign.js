const sqlConn = require('../../db/db_connection');

const createcampaign = async (createCampaignDetails) => {
  if (!createCampaignDetails.campaign_title || !createCampaignDetails.campaign_description || !createCampaignDetails.campaign_start_time || !createCampaignDetails.campaign_end_time || !createCampaignDetails.campaign_type || !createCampaignDetails.campaign_image || !createCampaignDetails.campaign_goal) throw new Error('Required fields cannot be empty');

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

  let insert_milestones = `INSERT INTO milestones ( milestone_title, milestone_desc, milestone_date, campaign_id) VALUES `
  const campaignQuery = await sqlConn.connection.query(`select * from campaign ORDER BY campaign_id desc limit 1`);
  const campaign_id = campaignQuery.rows[0].campaign_id;
  let startdate = new Date();
  createCampaignDetails.campaign_milestones_data.forEach((element, index) => {
    startdate.setDate(startdate.getDate() + element.duration)
    insert_milestones += `( '${element.title}', '${element.description}', '${(startdate.getFullYear() + '-' + Number(startdate.getMonth() + 1) + '-' + startdate.getDate() + " " + startdate.getHours() + ':' + startdate.getMinutes() + ':' + startdate.getSeconds())}', ${campaign_id} )`;
    if (index < createCampaignDetails.campaign_milestones_data.length - 1) {
      insert_milestones += ',';
    }
  });
  const insert_milestones_Query = await sqlConn.connection.query(insert_milestones);
  console.log(insert_milestones_Query)
  if (insert_milestones_Query.rowCount > 0) console.log('MileStones Inserted Successfully.');

  if (createCampaignDetails.campaign_type === 'profit') {
    const insert_profit = await sqlConn.connection.query(`insert into campaign_profit (campaign_profit_percentage, campaign_id) values ('${Number(createCampaignDetails.campaign_Profit_percentage)}', ${campaign_id})`);
    console.log(insert_profit)
    if (insert_profit.rowCount === 1) console.log('Profit Inserted Successfully.');
  } 
  
  else if (createCampaignDetails.campaign_type === 'reward') {
    console.log(createCampaignDetails.campaign_type_details)
    let insert_reward = `INSERT INTO campaign_reward ( campaign_reward_name, campaign_reward_amount,campaign_reward_description, campaign_id) VALUES `
    createCampaignDetails.campaign_type_details.forEach((element, index) => {
      insert_reward += `( '${element[0]}', '${Number(element[1])}', '${element[2]}', ${campaign_id} )`;
      if (index < createCampaignDetails.campaign_type_details.length - 1) {
        insert_reward += ',';
      }
    });
    const insert_reward_query = await sqlConn.connection.query(insert_reward);
    if (insert_reward_query.rowCount > 0) console.log('Rewards Inserted Successfully.');
  }
  
  else if (createCampaignDetails.campaign_type === 'equity') {
    console.log(createCampaignDetails.campaign_type_details)
    let insert_equity = `INSERT INTO campaign_equity ( campaign_equity_percentage, campaign_equity_amount, campaign_equity_description, campaign_id) VALUES `
    createCampaignDetails.campaign_type_details.forEach((element, index) => {
      insert_equity += `( '${element[0]}', '${Number(element[1])}', '${element[2]}', ${campaign_id} )`;
      if (index < createCampaignDetails.campaign_type_details.length - 1) {
        insert_equity += ',';
      }
    });
    const insert_equity_query = await sqlConn.connection.query(insert_equity);
    if (insert_equity_query.rowCount > 0) console.log('Equity Inserted Successfully.');
  }

};

module.exports.createcampaign = createcampaign;
