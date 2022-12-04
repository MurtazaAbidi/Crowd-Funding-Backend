const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken')
const sqlConn = require('../db/db_connection')

const campaignerchangepassword = async (changePasswordDetails) => {
    console.log(changePasswordDetails)
    if (!changePasswordDetails.email )throw new Error ('Email cannot be empty')

    const result = await sqlConn.connection.query(`SELECT * FROM users WHERE email LIKE '${changePasswordDetails.email}'`)
    if (result.rowCount === 0) throw new Error ('Campaigner Does Not Exist.')

    else{

        const newSecret = process.env.jwtPrivateKey + result.rows[0].password;
        try{
            const payload = jwt.verify(changePasswordDetails.token, newSecret)
            // result.render('change-password', {email:changePasswordDetails.email})

        }catch (error){
            throw new Error (error.message)
        }




        // const validPassword = await bcrypt.compare(loginDetails.password, result.rows[0].password)

        // if (!validPassword){
        //     throw new Error ('Incorrect Password')
        // } else {
        //     const {email} = result.rows[0]
        //     const token = jwt.sign({email:email}, process.env.jwtPrivateKey, {expiresIn:'3d'})
        //     return token;
        // }
    }

}

module.exports.campaignerchangepassword = campaignerchangepassword;