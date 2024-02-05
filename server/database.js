// Manages the database connection (dev vs. prod).

const mysql = require("mysql2");
let connectionPool; // Connection pool for our MySQL database.

// If in development mode, use dev database.
if (process.env.NODE_ENV === "development") {
  console.log("Using dev database.");
  connectionPool = mysql.createPool({
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    waitForConnections: true, // Whether the pool should wait for connections to become available if connection fails.
    connectionLimit: 10, // Maximum number of connections to create at once.
    queueLimit: 0, // No limit on the amount of queued connection requests.
  });
} else {
  // Otherwise, use production database.
  console.log("Using production database.");
  connectionPool = mysql.createPool({
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

module.exports = connectionPool;
