const sqlConn = require('../../db/db_connection');

const newCampaignRejected = async (rejectedCampaignData) => {
  
  const rejected = await sqlConn.connection.query(`insert into rejected_campaign (campaign_id, rejected_message) values (${rejectedCampaignData.id}, '${rejectedCampaignData.rejectedMessage}');`);
  if (rejected.rowCount === 1) console.log('Campaign Rejected Successfully.');
};

module.exports.newCampaignRejected =newCampaignRejected;