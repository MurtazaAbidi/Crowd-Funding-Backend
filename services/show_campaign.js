const sqlConn = require('../db/db_connection');

const showCampaign = async () => {
  

  const result = await sqlConn.connection.query(`select  c.*, (c.campaign_end_time- current_date) AS days_left, (100*(c.campaign_earning)/(c.campaign_goal)) as progress , count(f.campaign_id) as likes from campaign c left join favourites f on c.campaign_id= f.campaign_id group by c.campaign_id`);
  console.log(result.rows)
  return result.rows
};

module.exports.showCampaign = showCampaign;
