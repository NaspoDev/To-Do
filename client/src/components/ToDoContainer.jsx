// ToDoContainer Component

import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import { useState } from "react";
import { useEffect } from "react";
import { daysOfTheWeek, months } from "../utility/dates";
import Task from "../utility/Task";
import apiURL from "../api";

function ToDoContainer() {
  let currentDate = new Date();
  let writtenDay = daysOfTheWeek[currentDate.getDay()];
  let writtenMonth = months[currentDate.getMonth()];
  let fullDateFormatted = `${writtenDay}, ${writtenMonth} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const localStorageUserKey = "userId";

  // Lifting state up from ToDoForm to be shared with ToDoList.
  const [tasks, setTasks] = useState([]);

  // Lifting state up function to add a task. Passed down to the ToDoForm component.
  function addTask(task) {
    setTasks([...tasks, task]);
  }

  // Lifting state up function to delete a task. Passed down to the Task component.
  function deleteTask(taskIndex) {
    // Remove the task client-side.
    let newTasks = [...tasks];
    let removedTask = newTasks.splice(taskIndex, 1)[0];
    setTasks(newTasks);

    // Remove the task server-side.
    fetch(`${apiURL}/tasks/${removedTask.uuid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => console.log(`Task deleted successfully.`))
      .catch((error) => console.log(`Error deleting task: ${error}`));
  }

  // Lifting state up function to update a task. Passed down to the Task component.
  // Updates the task client-side and server-side.
  function updateTask(taskIndex, description, dueDate, completed) {
    // Update the task client-side.
    let newTasks = [...tasks];
    newTasks[taskIndex].description = description;
    newTasks[taskIndex].dueDate = dueDate;
    newTasks[taskIndex].completed = completed;
    setTasks(newTasks);

    // Update the task server-side.
    fetch(`${apiURL}/tasks/${newTasks[taskIndex].uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
        dueDate: dueDate,
        completed: completed,
      }),
    })
      .then((response) => response.json())
      .then(() => console.log("Task updated successfully."))
      .catch((error) => console.log(`Error updating task: ${error}`));
  }

  // Restore the user's tasks from the database.
  function restoreTasks() {
    const userId = localStorage.getItem(localStorageUserKey);

    // If there is no user for this session, do not restore tasks.
    if (userId === null) {
      return;
    }

    // Otherwise if there is a user, restore their tasks from the database.
    fetch(`${apiURL}/tasks/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`Restoring tasks for user ${userId}...`);
        // Create a list of Task objects from the data and set the tasks state.
        let restoredTasks = data.map((task) => {
          // Format the due date if it exists.
          let dueDateFormatted = null;
          if (task.due_date !== null) {
            dueDateFormatted = new Date(task.due_date)
              .toISOString()
              .slice(0, 19);
          }

          // Create a new Task object.
          let newTask = new Task(task.description, dueDateFormatted, task.uuid);

          // Set the completed status if it exists.
          if (task.completed) {
            newTask.completed = true;
          }

          return newTask;
        });

        setTasks(restoredTasks);
        console.log("Tasks successfully restored.");
      })
      .catch((error) => {
        console.log(`Error restoring tasks: ${error}`);
      });
  }

  // useEffect hook to restore tasks from the database when the component mounts.
  useEffect(() => {
    restoreTasks();
  }, []);

  return (
    <div className="ToDoContainer">
      <div className="heading-area">
        <h1 className="main-heading">My To-Do List</h1>
        <h2 className="date-subheading">{fullDateFormatted}</h2>
      </div>
      <ToDoForm addTask={addTask} localStorageUserKey={localStorageUserKey} />
      <ToDoList
        tasks={tasks}
        deleteTaskHandler={deleteTask}
        updateTaskHandler={updateTask}
      />
    </div>
  );
}

export default ToDoContainer;
