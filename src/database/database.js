require('dotenv').config();
module.exports = {
  host: 'localhost',
  port: 33006,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'mysql',
  logging: process.env.DB_AUTO_LOAD_MODELS === 'true',
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
};
