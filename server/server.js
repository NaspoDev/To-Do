// Backend server for our To-Do app.

const express = require("express");
const app = express();
const port = 3000;

// load environment variables
require("dotenv").config();
console.log(process.env); // delete this once confirmed to be working

// users route
// need to setup mysql database!
app.get("/users", (req, res) => {
  res.json([]);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
