const sqlConn = require('../../db/db_connection');

const showMyCampaign = async (email) => {

  const myCampaigns = await sqlConn.connection.query(`select  c.*, cc.campaigner_name, (c.campaign_end_time- current_date) AS days_left, (100*(c.campaign_earning)/(c.campaign_goal)) as progress , count(f.campaign_id) as likes from campaign c left join favourites f on c.campaign_id= f.campaign_id left join campaigner cc on c.campaigner_id = cc.campaigner_id where cc.campaigner_email='${email}' group by c.campaign_id, cc.campaigner_name order by c.campaign_id desc`);
  const rejectedCampaigns = await sqlConn.connection.query(`select r.campaign_id, r.rejected_message from rejected_campaign r inner join campaign c on r.campaign_id= c.campaign_id inner join campaigner cmpr on c.campaigner_id = cmpr.campaigner_id where cmpr.campaigner_email = '${email}' `)
  const requestForTime = await sqlConn.connection.query(`SELECT campaign_id, resolved, rejected from campaign_time_extension`);
  
  console.log("Total Valid campaigns returned: "+(myCampaigns.rows.length-rejectedCampaigns.rows.length))
  console.log("Total rejected campaigns: "+rejectedCampaigns.rows.length)
  return {myCampaigns: myCampaigns.rows, rejectedCampaigns: rejectedCampaigns.rows, requestForTime: requestForTime.rows}
};

module.exports.showMyCampaign = showMyCampaign;
