// Backend server for our To-Do app.

const express = require("express");
const app = express();
const port = 3000;

// users route
// need to setup mysql database!
app.get("/users", (req, res) => {
  res.json([]);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
