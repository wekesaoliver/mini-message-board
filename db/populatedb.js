#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
"user" VARCHAR (255) NOT NULL,
text TEXT NOT NULL,
added TIMESTAMP DEFAULT NOW()
);

INSERT INTO messages ("user", text, added)
VALUES
('Oliver', 'Hello there!', NOW()),
('Charles', 'Hello world!', NOW())
ON CONFLICT DO NOTHING;
`;

async function main() {
    console.log("seeding...");

    // Priority: command line arg > DATABASE_URL > individual env vars
    const connectionString = process.argv[2] || process.env.DATABASE_URL;

    const clientConfig = connectionString
        ? {
              connectionString: connectionString,
              // Enable SSL for production/cloud databases (Railway, Heroku, etc.)
              ssl: process.env.NODE_ENV === "production" || connectionString.includes('railway') || connectionString.includes('heroku')
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

    const client = new Client(clientConfig);

    try {
        await client.connect();
        console.log("Connected to database");
        await client.query(SQL);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

main();
