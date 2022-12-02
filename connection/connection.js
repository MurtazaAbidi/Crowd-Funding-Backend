const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "admin12345",
  database: "Elevate_Database",
});

client
  .connect()
  .then(() => {
    console.log("Successfully connected to Database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

module.exports = client;