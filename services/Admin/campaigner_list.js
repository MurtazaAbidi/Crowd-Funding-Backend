const sqlConn = require('../../db/db_connection');

const campaignerList = async () => {
  const result = await sqlConn.connection.query(`select * from campaigner order by campaigner_id `);
  console.log(result.rows)
  return result.rows
};

module.exports.campaignerList = campaignerList;
