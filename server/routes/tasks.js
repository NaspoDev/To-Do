// tasks route

const express = require("express");
const router = express.Router();

const db = require("../database");

// --- GET REQUESTS ---

// get all tasks
router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while retrieving tasks.",
        error: err,
      });
      return;
    }
    res.json(result);
  });
});

// get task by id
router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM tasks WHERE id = ${req.params.id}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while retrieving the task.",
        error: err,
      });
      return;
    }
    res.json(result);
  });
});

// get tasks by user id
router.get("/user/:id", (req, res) => {
  db.query(
    `SELECT * FROM tasks WHERE user_id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "An error occurred while retrieving tasks.",
          error: err,
        });
        return;
      }
      res.json(result);
    }
  );
});

// --- POST REQUESTS ---

// create a new task
router.post("/", (req, res) => {
  console.log(req.body);
  const { description, dueDate, userId } = req.body;
  // if dueDate is null, set dueDateValue to null, otherwise set it to the value in dueDate
  const dueDateValue = dueDate ? `'${dueDate}'` : "NULL";

  db.query(
    `INSERT INTO tasks (description, due_date, user_id) VALUES ('${description}', ${dueDateValue}, ${userId})`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "An error occurred while creating the task.",
          error: err,
        });
        return;
      }
      res.json({ message: "Task created successfully!", result: result });
    }
  );
});

// PUT REQUESTS

// update a task
router.put("/:id", (req, res) => {
  const { description, dueDate, completed } = req.body;
  const dueDateValue = dueDate ? `'${dueDate}'` : "NULL";

  db.query(
    `UPDATE tasks SET description = '${description}', due_date = ${dueDateValue}, completed = ${completed} WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "An error occurred while updating the task.",
          error: err,
        });
        return;
      }
      res.json({ message: "Task updated successfully!", result: result });
    }
  );
});

// DELETE REQUESTS

// delete a task
router.delete("/:id", (req, res) => {
  db.query(`DELETE FROM tasks WHERE id = ${req.params.id}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while deleting the task.",
        error: err,
      });
      return;
    }
    res.json({ message: "Task successfully deleted.", result: result });
  });
});

module.exports = router;
