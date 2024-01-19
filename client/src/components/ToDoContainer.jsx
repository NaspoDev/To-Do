// ToDoContainer Component

import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import { useState } from "react";
import { daysOfTheWeek, months } from "../utility/dates";
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
    fetch(`${apiURL}/tasks/${removedTask.databaseId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(`Error deleting task: ${error}`));
  }

  return (
    <div className="ToDoContainer">
      <div className="heading-area">
        <h1 className="main-heading">My To-Do List</h1>
        <h2 className="date-subheading">{fullDateFormatted}</h2>
      </div>
      <ToDoForm addTask={addTask} localStorageUserKey={localStorageUserKey} />
      <ToDoList tasks={tasks} deleteTaskHandler={deleteTask} />
    </div>
  );
}

export default ToDoContainer;
