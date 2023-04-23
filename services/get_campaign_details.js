const sqlConn = require('../db/db_connection');

const getCampaignDetails = async (id) => {
  

  const MileStonesList = await sqlConn.connection.query(`select * from milestones where campaign_id = ${id}`);
  const InvestorsList = await sqlConn.connection.query(`select invst.invest_id, i.investor_name, i.investor_email, invst.invest_amount from investor i, invests invst where i.investor_id=invst.investor_id and invst.campaign_id= ${id}`);
  const Comments = await sqlConn.connection.query(`select * from comments where campaign_id = ${id}`);

  console.log({milestones:MileStonesList.rows, investors: InvestorsList.rows, comments: Comments.rows})
  return {milestones:MileStonesList.rows, investors: InvestorsList.rows, comments: Comments.rows}
};

module.exports.getCampaignDetails = getCampaignDetails;
