// Backend server for our To-Do app.

// load environment variables
require("dotenv").config();

// Import CORS (used for development)
const cors = require("cors");

const express = require("express");
const app = express();
const port = 3000;

// IP address restriction middleware (for production)
const clientHostname = "todo.naspoapps.com";
function restrictAccess(req, res, next) {
  if (req.hostname === clientHostname) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

// Applying middleware
app.use(express.json()); // for parsing application/json
// Enable CORS with express for development environment, otherwise let Nginx handle it in production.
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}
// Enable IP address restriction middleware in production.
if (process.env.NODE_ENV !== "development") {
  app.use(restrictAccess);
}

// Routes
app.get("/", (req, res) => {
  res.send("Try /users or /tasks!");
});

const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
