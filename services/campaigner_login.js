const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken')
const sqlConn = require('../db/db_connection')

const campaignerlogin = async (loginDetails) => {
    if (!loginDetails.email || !loginDetails)throw new Error ('Required fields cannot be empty')

    const result = await sqlConn.connection.query(`SELECT * FROM users WHERE email LIKE '${loginDetails.email}'`)
    if (result.rowCount === 0) throw new Error ('Campaigner Does Not Exist.')

    else{
        const validPassword = await bcrypt.compare(loginDetails.password, result.rows[0].password)

        if (!validPassword){
            throw new Error ('Incorrect Password')
        } else {
            const {email} = result.rows[0]
            const token = jwt.sign({email:email}, process.env.jwtPrivateKey, {expiresIn:'3d'})
            return token;
        }
    }






    // if (!loginDetails.email || !loginDetails.password) throw new Error ('Required fields cannot be empty');

    // const result = await sqlConn.connection.query (`SELECT * FROM public."CAMPAIGNREWARDS";`);
    
    // if (result.rowCount===0) throw new Error ('zero rows persent');
    // else{
    //     console.log(result.rows);
    // }

}

module.exports.campaignerlogin = campaignerlogin;