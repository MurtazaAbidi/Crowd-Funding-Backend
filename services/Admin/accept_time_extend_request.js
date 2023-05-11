const sqlConn = require('../../db/db_connection');

const acceptTimeExtendRequest = async (id) => {
  
  const updateTimeInCampaignTable = await sqlConn.connection.query(`update campaign set campaign_end_time = (campaign_end_time + INTERVAL '15 day') where campaign_id =${id} `);
  if (updateTimeInCampaignTable.rowCount === 1) console.log('Admin accepts time extension request Successfully.');
  const updateTimeExtensionTable = await sqlConn.connection.query(`update campaign_time_extension set resolved = true and rejected=false where campaign_id =${id} `);
  if (updateTimeExtensionTable.rowCount === 1) console.log('Admin accepts time extension request Successfully.');
};

module.exports.acceptTimeExtendRequest =acceptTimeExtendRequest;