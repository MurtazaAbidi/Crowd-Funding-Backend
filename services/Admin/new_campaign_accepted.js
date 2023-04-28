const sqlConn = require('../../db/db_connection');

const newCampaignAccepted = async (id) => {
  
  const update = await sqlConn.connection.query(`update campaign set campaign_status = true where campaign_id = ${id}`);
  if (update.rowCount === 1) console.log('Campaign Added Successfully.');
};

module.exports.newCampaignAccepted =newCampaignAccepted;
