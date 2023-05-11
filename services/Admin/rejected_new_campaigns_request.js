const sqlConn = require('../../db/db_connection');

const rejectedNewCampaignsRequest = async () => {
  
  const result = await sqlConn.connection.query(`
    select  
        c.*, 
        cc.campaigner_name,
        (c.campaign_end_time- current_date) AS days_left,
        rr.rejected_message
    from campaign c 
    left join campaigner cc on c.campaigner_id = cc.campaigner_id
    left join rejected_campaign rr on rr.campaign_id = c.campaign_id
    where c.campaign_status = false and c.campaign_id in (select campaign_id from rejected_campaign) 
    group by c.campaign_id, cc.campaigner_name , rr.rejected_message
    order by c.campaign_id desc
  `);
  return result.rows
};

module.exports.rejectedNewCampaignsRequest =rejectedNewCampaignsRequest;
