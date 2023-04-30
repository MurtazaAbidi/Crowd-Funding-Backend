const sqlConn = require('../../db/db_connection');

const acceptTimeExtendRequest = async (id) => {
  
  const update = await sqlConn.connection.query(`update campaign set campaign_end_time = (campaign_end_time + INTERVAL '15 day') where campaign_id =${id} `);
  if (update.rowCount === 1) console.log('Admin accepts time extension request Successfully.');
};

module.exports.acceptTimeExtendRequest =acceptTimeExtendRequest;