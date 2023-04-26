const bcrypt = require('bcrypt');
const sqlConn = require('../../db/db_connection');

const campaignersignup = async (signupDetails) => {
  if (!signupDetails.name || !signupDetails.email || !signupDetails.password || !signupDetails.phone || !signupDetails.cnic || !signupDetails.officeAddress ) throw new Error('Required fields cannot be empty');

  const result = await sqlConn.connection.query(`SELECT * FROM campaigner WHERE campaigner_email LIKE '${signupDetails.email}'`);
  if (result.rowCount > 0) throw new Error('Campaigner Already Exist.');

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(signupDetails.password, salt);

  const insert = await sqlConn.connection.query(`INSERT INTO campaigner (campaigner_name, campaigner_email, campaigner_password, campaigner_contact, campaigner_cnic, office_address) VALUES ('${signupDetails.name}', '${signupDetails.email}', '${password}', '${signupDetails.phone}', '${signupDetails.cnic}', '${signupDetails.officeAddress}')`);
  console.log(insert)
  if (insert.rowCount === 1) console.log('Campaigner Inserted Successfully.');
};

module.exports.campaignersignup = campaignersignup;
