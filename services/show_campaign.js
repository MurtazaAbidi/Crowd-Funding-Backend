const sqlConn = require('../db/db_connection');

const showCampaign = async () => {
  

  const result = await sqlConn.connection.query(`Select * from campaign`);
  console.log(result.rows)
  return result.rows


};

module.exports.showCampaign = showCampaign;
