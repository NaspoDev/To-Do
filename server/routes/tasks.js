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

// get tasks by user id
router.get("/user/:id", (req, res) => {
  db.query(
    `SELECT * FROM tasks WHERE user_id = ${req.params.id}`,
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});

// create a new task
router.post("/", (req, res) => {
  const { description, dueDate, userId } = req.body;

  db.query(
    `INSERT INTO tasks (description, due_date, user_id) VALUES ('${description}', '${dueDate}', ${userId})`,
    (err, rows) => {
      if (err) throw err;
      res.json({ message: "Task created successfully!", task: rows });
    }
  );
});

module.exports = router;
