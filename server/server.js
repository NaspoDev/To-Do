// Backend server for our To-Do app.

// load environment variables
require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const connection = require("./database");

// users route
// need to setup mysql database!
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.json(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
