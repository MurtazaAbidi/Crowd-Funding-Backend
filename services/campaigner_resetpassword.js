const nodemailer = require('nodemailer')
const sqlConn = require('../db/db_connection');
const jwt = require('jsonwebtoken')

const campaignerresetpassword = async (email) => {
  if (!email ) throw new Error('Email Address cannot be empty');

  const result = await sqlConn.connection.query(`SELECT * FROM users WHERE email LIKE '${email}'`)
  if (result.rowCount === 0) throw new Error ('Campaigner Does Not Exist.')

  else{
    console.log(result.rows[0].email)
    console.log(result.rows[0].password)

    //create a One time link valid for 15 minutes
    const newSecret = process.env.jwtPrivateKey + result.rows[0].password;
    const payload = {
        email: result.rows[0].email, 
    }
    const token = jwt.sign (payload, newSecret, {expiresIn:'15m'})

    const link = `http://localhost:3300/api/change-password/${result.rows[0].email}/${token}`;
    console.log(link)

    // -------------------------------------------------------------------------------------------------------
    
    // Send the above link through Email to campaigner
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "elevatefyp2023@gmail.com",
          pass: "bpjvcroodhybexmp",
        }
      });
    
      const mailOptions = {
        from : 'elevatefyp2023@gmail.com',
        to: `${result.rows[0].email}`,
        subject: 'Reset Password Link',
        text: `${link}
        Click the Above Link to reset your Password\n
        Regards,
        Team Elevate.\n\n
        Thanks :)`
      };
      
      transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            throw new Error(error)
        //   res.send(error)
        } else {
            console.log('Email send '+ info.response)
        //   res.send('Email send '+ info.response)
        }
      })
    
    // -------------------------------------------------------------------------------------------------------
                


    //   const validPassword = await bcrypt.compare(loginDetails.password, result.rows[0].password)

    //   if (!validPassword){
    //       throw new Error ('Incorrect Password')
    //   } else {
    //       const {email} = result.rows[0]
    //       const token = jwt.sign({email:email}, process.env.jwtPrivateKey, {expiresIn:'3d'})
    //       return token;
    //   }
  }
};

module.exports.campaignerresetpassword = campaignerresetpassword;
