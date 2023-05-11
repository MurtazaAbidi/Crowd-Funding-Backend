const sqlConn = require('../../db/db_connection');

const acceptedTimeExtensionRequests = async () => {
  
  const result = await sqlConn.connection.query(`
    select c.*,
        (c.campaign_end_time - current_date) AS days_left,
        (100*(c.campaign_earning)/(c.campaign_goal)) AS progress,
        COUNT(f.campaign_id) AS likes,
        cc.campaigner_name
    from 
        campaign_time_extension cte 
    LEFT JOIN
        campaign c on c.campaign_id = cte.campaign_id
    LEFT JOIN 
        favourites f ON cte.campaign_id = f.campaign_id
    LEFT JOIN
        campaigner cc on c.campaigner_id = cc.campaigner_id
    where 
        cte.resolved = true and cte.rejected=false
    group by 
        cte.time_extension_id, c.campaign_id, cc.campaigner_name 
    order by 
        cte.time_extension_id desc
 
  `);
  console.log(result.rows)
  return result.rows
};

module.exports.acceptedTimeExtensionRequests = acceptedTimeExtensionRequests;
