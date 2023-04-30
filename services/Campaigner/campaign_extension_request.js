const sqlConn = require('../../db/db_connection');

const campaignExtensionRequest = async (id) => {

    const add = await sqlConn.connection.query(`insert into campaign_time_extension ( campaign_id ) values (${id});`);

    if (add.rowCount === 1) console.log('Time Extension Request Sent Successfully.');
};

module.exports.campaignExtensionRequest = campaignExtensionRequest;
