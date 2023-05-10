const sqlConn = require('../../db/db_connection');

const rejectTimeExtendRequest = async (id, rejected_message) => {
    const updateTimeExtensionTable = await sqlConn.connection.query(`update campaign_time_extension set resolved = true, rejected=true, rejected_message='${rejected_message}' where campaign_id =${id} `);
  if (updateTimeExtensionTable.rowCount === 1) console.log('Admin accepts time extension request Successfully.');
};

module.exports.rejectTimeExtendRequest =rejectTimeExtendRequest;