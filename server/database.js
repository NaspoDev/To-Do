// Manages the database connection (dev vs. prod).

const mysql = require("mysql");
// Establish database connection to prod database by default.
const connection = mysql.createConnection({
  host: process.env.PROD_DB_HOST,
  port: process.env.PROD_DB_PORT,
  user: process.env.PROD_DB_USER,
  password: process.env.PROD_DB_PASSWORD,
  database: process.env.PROD_DB_NAME,
});

// If in development mode, use dev database.
if (process.env.NODE_ENV === "development") {
  connection = mysql.createConnection({
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
  });
}

export default connection;
