const sqlConn = require('../../db/db_connection');

const investorList = async () => {
  const result = await sqlConn.connection.query(`select * from investor order by investor_id `);
  console.log(result.rows)
  return result.rows
};

module.exports.investorList = investorList;
