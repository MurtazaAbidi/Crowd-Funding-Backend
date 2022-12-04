const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const sqlConn = require('../db/db_connection')

const campaignersubmitchangepassword = async (paramsDetails, changePasswordDetails) => {
    // console.log(changePasswordDetails)
    if (!paramsDetails.email )throw new Error ('Email cannot be empty')

    const result = await sqlConn.connection.query(`SELECT * FROM users WHERE email LIKE '${paramsDetails.email}'`)
    if (result.rowCount === 0) throw new Error ('Campaigner Does Not Exist.')

    else{

        const newSecret = process.env.jwtPrivateKey + result.rows[0].password;
        try{
            const payload = jwt.verify(paramsDetails.token, newSecret);

            //validate your password and confirm password should be same or not
            
            // after validation of password and password
            // we can simply find the user with the payload email 
            const salt = await bcrypt.genSalt(10);

            const password = await bcrypt.hash(changePasswordDetails.password, salt);
            
            const update = await sqlConn.connection.query(`UPDATE users SET password='${password}' WHERE email='${result.rows[0].email}'`)
            
            if (update.rowCount===1) console.log('Password Changed Successfully');

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

module.exports.campaignersubmitchangepassword = campaignersubmitchangepassword;