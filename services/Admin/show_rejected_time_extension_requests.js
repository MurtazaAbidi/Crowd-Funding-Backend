const sqlConn = require('../../db/db_connection');

const showRejectedTimeExtensionRequests = async () => {
    const result = await sqlConn.connection.query(`
        SELECT c.*, cc.campaigner_name, (c.campaign_end_time- current_date) AS days_left,
        (100*(c.campaign_earning)/(c.campaign_goal)) AS progress , count(f.campaign_id) AS likes,
        cte.rejected_message
        FROM campaign c 
        LEFT JOIN favourites f ON c.campaign_id= f.campaign_id 
        LEFT JOIN campaigner cc ON c.campaigner_id = cc.campaigner_id 
        INNER JOIN campaign_time_extension cte ON c.campaign_id=cte.campaign_id 
        WHERE cte.resolved=true AND cte.rejected=true
        GROUP BY c.campaign_id, cc.campaigner_name, c.campaign_end_time, 
        c.campaign_earning, c.campaign_goal, cte.rejected_message
        ORDER BY c.campaign_id DESC;
    `);
    console.log(result.rows)
    return result.rows
};

module.exports.showRejectedTimeExtensionRequests = showRejectedTimeExtensionRequests;
