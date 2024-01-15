// ToDoContainer Component

import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";

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

  return (
    <div className="ToDoContainer">
      <div className="heading-area">
        <h1 className="main-heading">My To-Do List</h1>
        <h2 className="date-subheading">{fullDateFormatted}</h2>
      </div>
      <ToDoForm />
      {/* <ToDoList /> */}
    </div>
  );
}

export default ToDoContainer;
