require("dotenv").config();

const { Pool } = require("pg");

// Use DATABASE_URL if available (Railway, Heroku, etc.), otherwise use individual variables
const poolConfig = process.env.DATABASE_URL
    ? {
          connectionString: process.env.DATABASE_URL,
          // Enable SSL for production/cloud databases (Railway, Heroku, etc.)
          ssl: process.env.NODE_ENV === "production" || process.env.DATABASE_URL.includes('railway') || process.env.DATABASE_URL.includes('heroku')
              ? { rejectUnauthorized: false }
              : false,
      }
    : {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD,
          port: process.env.DB_PORT,
      };

module.exports = new Pool(poolConfig);
