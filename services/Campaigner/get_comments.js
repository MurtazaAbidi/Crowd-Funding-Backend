const sqlConn = require('../../db/db_connection');

const getComments = async (id) => {
  const comments = await sqlConn.connection.query(`select * from comments where campaign_id=${id} order by comment_date desc `);
  return comments.rows;
};

module.exports.getComments = getComments;
