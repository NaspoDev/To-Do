// Backend server for our To-Do app.

// load environment variables
require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const db = require("./database");

// users route
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// tasks route
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// TODO: add a route for POSTing data

app.listen(port, () => console.log(`Listening on port ${port}!`));
