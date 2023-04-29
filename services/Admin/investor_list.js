const sqlConn = require('../../db/db_connection');

const investorList = async () => {
  const result = await sqlConn.connection.query(`
  SELECT i.*, SUM(ii.invest_amount) as total_investment
  FROM investor i 
  LEFT JOIN invests ii ON i.investor_id = ii.investor_id
  GROUP BY i.investor_id order by i.investor_id;
  `);
  console.log(result.rows)
  return result.rows
};

module.exports.investorList = investorList;
