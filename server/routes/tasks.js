// tasks route

const express = require("express");
const router = express.Router();

const db = require("../database");

// --- GET REQUESTS ---

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

// --- POST REQUESTS ---

// create a new task
router.post("/", (req, res) => {
  const { description, dueDate, userId } = req.body;
  // if dueDate is null, set dueDateValue to null, otherwise set it to the value in dueDate
  const dueDateValue = dueDate ? `'${dueDate}'` : null;

  db.query(
    `INSERT INTO tasks (description, due_date, user_id) VALUES ('${description}', ${dueDateValue}, ${userId})`,
    (err, rows) => {
      if (err) throw err;
      res.json({ message: "Task created successfully!", task: rows });
    }
  );
});

// PUT REQUESTS

// update a task
router.put("/:id", (req, res) => {
  const { description, dueDate, completed } = req.body;
  const dueDateValue = dueDate ? `'${dueDate}'` : null;

  db.query(
    `UPDATE tasks SET description = '${description}', due_date = ${dueDateValue}, completed = ${completed} WHERE id = ${req.params.id}`
  );
});

// DELETE REQUESTS

// delete a task
router.delete("/:id", (req, res) => {
  db.query(`DELETE FROM tasks WHERE id = ${req.params.id}`, (err, rows) => {
    if (err) throw err;
    res.json({ message: "Task successfully deleted." });
  });
});

module.exports = router;
