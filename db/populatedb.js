#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS message (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user VARCHAR (255) NOT NULL,
text TEXT NOT NULL,
added TIMESTAMP DEFAULT NOW()
)

INSERT INTO message (user, text, added)
VALUES
("Oliver", "Hello there!", NOW()),
("Charles", "Hello world!", NOW())
ON CONFLICT DO NOTHING;
`;

async function main() {
    console.log("seeding...");

    const connectionString = process.argv[2];

    const client = connectionString
        ? new Client({ connectionString })
        : new Client({
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              database: process.env.DB_NAME,
              password: process.env.DB_PASSWORD,
              port: process.env.DB_PORT,
          });

    try {
        await client.connect();
        await client.querys(SQL);
        console.log("done");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await client.end();
    }
}

main();
