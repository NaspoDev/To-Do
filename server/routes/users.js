// user route

const express = require("express");
const router = express.Router();

const db = require("../database");

// get all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// get user by id
router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// create a new user
router.post("/", (req, res) => {
  const { dateCreated } = req.body;

  db.query(`INSERT INTO users () VALUES ()`, (err, rows) => {
    if (err) throw err;
    res.json({ message: "User created successfully!", user: rows });
  });
});

module.exports = router;
