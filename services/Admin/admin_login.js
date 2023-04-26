const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken')
const sqlConn = require('../../db/db_connection');

const adminLogin = async (loginDetails) => {
    if (!loginDetails.email || !loginDetails)throw new Error ('Required fields cannot be empty')

    const result = await sqlConn.connection.query(`SELECT * FROM admin WHERE admin_email LIKE '${loginDetails.email}'`)
    if (result.rowCount === 0) throw new Error ('Admin Does Not Exist.')

    else{
        const validPassword = await bcrypt.compare(loginDetails.password, result.rows[0].admin_password)

        if (!validPassword){
            throw new Error ('Incorrect Password')
        } else {
            const {admin_email} = result.rows[0]
            const token = jwt.sign({email:admin_email}, process.env.jwtPrivateKey, {expiresIn:'3d'})
            return token;
        }
    }


}

module.exports.adminLogin = adminLogin;