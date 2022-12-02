const {Client} = require('pg');

const client = new Client({
    host:'localhost',
    port:'5432',
    user: 'postgres', 
    password: 'murtaza123', 
    database: 'Elevate',
})

exports.connection = client;

