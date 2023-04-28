const sqlConn = require('../../db/db_connection');

const campaignRequest = async () => {
  
  const result = await sqlConn.connection.query(`select  c.*, cc.campaigner_name, (c.campaign_end_time- current_date) AS days_left from campaign c left join campaigner cc on c.campaigner_id = cc.campaigner_id  where c.campaign_status = false and c.campaign_id not in (select campaign_id from rejected_campaign) group by c.campaign_id, cc.campaigner_name order by c.campaign_id desc`);
  console.log(result.rows)
  return result.rows
};

module.exports.campaignRequest =campaignRequest;
