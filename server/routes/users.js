// user route

const express = require("express");
const router = express.Router();

const db = require("../database");

// --- GET REQUESTS ---

// get all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// get user by id
router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// --- POST REQUESTS ---

// create a new user
router.post("/", (req, res) => {
  db.query(`INSERT INTO users () VALUES ()`, (err, result) => {
    if (err) throw err;
    res.json({
      message: "User created successfully!",
      result: result,
    });
  });
});

module.exports = router;
