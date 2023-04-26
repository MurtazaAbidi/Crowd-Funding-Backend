const sqlConn = require('../../db/db_connection');

const showMyCampaign = async (email) => {

  const result = await sqlConn.connection.query(`select  c.*, cc.campaigner_name, (c.campaign_end_time- current_date) AS days_left, (100*(c.campaign_earning)/(c.campaign_goal)) as progress , count(f.campaign_id) as likes from campaign c left join favourites f on c.campaign_id= f.campaign_id left join campaigner cc on c.campaigner_id = cc.campaigner_id where cc.campaigner_email='${email}' group by c.campaign_id, cc.campaigner_name order by c.campaign_id desc`);
  console.log("Total Rows: "+result.rows.length)
  return result.rows
};

module.exports.showMyCampaign = showMyCampaign;
