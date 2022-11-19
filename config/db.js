/* eslint-disable quotes */
// require("dotenv").config();
// const Postgre = require("pg").Pool;

// const connection = new Postgre({
//   user: process.env.DB_USERNAME,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

// module.exports = connection;

const { Pool, Client } = require("pg");
require("dotenv").config();

console.log("process.env.ENV_MODE", process.env.ENV_MODE);
let connection;
if (process.env.ENV_MODE === "prod") {
  connection = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  connection = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });
}

const connect = async () => {
  try {
    const response = await connection.connect();
    if (response) console.log("Connect to database");
  } catch (err) {
    console.log(err);
  }
};

connect();
module.exports = connection;
