const {Client} = require('pg');

const client = new Client({
    host:'localhost',
    port:'5432',
    user: 'postgres', 
    password: 'admin123', 
    database: 'Elevate',
})

// const client = new Client({
//     host:'satao.db.elephantsql.com',
//     port:'5432',
//     user: 'kyatsxod', 
//     password: 'bb4jAjsSfGiYW5mSNr3914iTe0wjTRhu', 
//     database: 'kyatsxod',
// })

exports.connection = client;

