const sqlConn = require('../../db/db_connection');
const getProfile = async (email) => {
    const result = await sqlConn.connection.query(`select c.*, TotalCampaigns from campaigner c left join (select campaigner_id, count(campaigner_id) as TotalCampaigns from campaign group by campaigner_id ) cmp on c.campaigner_id = cmp.campaigner_id where c.campaigner_email='${email}'`);
    console.log(result.rows)
    return result.rows[0];
};

module.exports.getProfile = getProfile;
