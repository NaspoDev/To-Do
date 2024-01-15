// ToDoContainer Component

import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import { useState } from "react";

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function ToDoContainer() {
  let currentDate = new Date();
  let writtenDay = daysOfTheWeek[currentDate.getDay()];
  let writtenMonth = months[currentDate.getMonth()];
  let fullDateFormatted = `${writtenDay}, ${writtenMonth} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  // Lifting state up from ToDoForm to be shared with ToDoList
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  return (
    <div className="ToDoContainer">
      <div className="heading-area">
        <h1 className="main-heading">My To-Do List</h1>
        <h2 className="date-subheading">{fullDateFormatted}</h2>
      </div>
      <ToDoForm addTask={addTask} />
      <ToDoList tasks={tasks} />
    </div>
  );
}

export default ToDoContainer;
