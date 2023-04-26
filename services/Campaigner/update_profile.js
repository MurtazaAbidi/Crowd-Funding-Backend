const sqlConn = require('../../db/db_connection');

const updateProfile = async (profileData) => {
    if (!profileData.campaigner_name || !profileData.campaigner_cnic || !profileData.campaigner_contact || !profileData.office_address) throw new Error('Required fields cannot be empty');

    console.log(profileData)
    let update = "";
    if (profileData.campaigner_image === null) {
        update = await sqlConn.connection.query(`UPDATE campaigner set campaigner_name='${profileData.campaigner_name}', campaigner_cnic='${profileData.campaigner_cnic}', campaigner_contact='${profileData.campaigner_contact}', office_address='${profileData.office_address}' WHERE campaigner_email='${profileData.email}'`);
    }else{
        update = await sqlConn.connection.query(`UPDATE campaigner set campaigner_name='${profileData.campaigner_name}', campaigner_cnic='${profileData.campaigner_cnic}', campaigner_contact='${profileData.campaigner_contact}', campaigner_image='${profileData.campaigner_image}', office_address='${profileData.office_address}' WHERE campaigner_email='${profileData.email}'`);
    }
    if (update.rowCount === 1) console.log('Campaigner Updated Successfully.');
};

module.exports.updateProfile = updateProfile;
