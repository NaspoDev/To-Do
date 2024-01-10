// tasks route

const express = require("express");
const router = express.Router();

const db = require("../database");

// get all tasks
router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// get task by id
router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM tasks WHERE id = ${req.params.id}`, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

module.exports = router;
