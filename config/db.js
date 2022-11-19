/* eslint-disable quotes */
require("dotenv").config();
const Postgre = require("pg").Pool;

const connection = new Postgre({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = connection;
