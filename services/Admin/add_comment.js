const sqlConn = require('../../db/db_connection');

const addComment = async (addCommentData) => {
  if (!addCommentData.comment_msg || !addCommentData.campaign_id || !addCommentData.comment_date || !addCommentData.campaigner_id ) throw new Error('Required fields cannot be empty');

  console.log(`INSERT INTO comments ("comment_msg", "campaign_id", "campaigner_id", "comment_date" ) VALUES ( '${addCommentData.comment_msg}', ${addCommentData.campaign_id}, ${addCommentData.campaigner_id}, '${addCommentData.comment_date}')`);
  const insert = await sqlConn.connection.query(`INSERT INTO comments ("comment_msg", "campaign_id", "campaigner_id", "comment_date" ) VALUES ( '${addCommentData.comment_msg}', ${addCommentData.campaign_id}, ${addCommentData.campaigner_id}, '${addCommentData.comment_date}')`);
  if (insert.rowCount === 1) console.log('Campaign Inserted Successfully.');

};

module.exports.addComment = addComment;
