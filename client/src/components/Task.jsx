// Task component. The actual task item that will be displayed in the list.

import { months } from "../utility/dates";
import { useState } from "react";

function Task({
  description,
  dueDate,
  completed,
  uuid,
  deleteTaskHandler,
  updateTaskHandler,
}) {
  // State to keep track of whether the task is checked or not.
  const [isChecked, setIsChecked] = useState(completed);

  return (
    <li className="Task">
      <input
        type="checkbox"
        className="task-checkbox"
        onChange={handleCheckboxClick}
        checked={isChecked}
      />

      <div className="task-content-container">
        <input
          type="text"
          className="task-description"
          defaultValue={description}
          onBlur={handleDescriptionBlurEvent}
          onKeyDown={(event) => {
            // If the user presses the Enter key, unfocus.
            if (event.key === "Enter") {
              event.currentTarget.blur();
            }
          }}
        />
        <p className="task-due-date">{formatDueDate(dueDate)}</p>
      </div>

      <div className="delete-task-button-container">
        <button className="delete-task-button" onClick={handleDeleteTaskClick}>
          <i className="fa-solid fa-trash icon"></i>
        </button>
      </div>
    </li>
  );

  // When the input loses focus, (typically after it has been edited),
  // update the new task description in the database.
  function handleDescriptionBlurEvent(event) {
    // If the input is blank (only whitespace), reset it to the original description.
    if (event.currentTarget.value.trim().length === 0) {
      event.currentTarget.value = description;
      return;
    }

    // Update the task client-side and server-side.
    updateTaskHandler(uuid, event.currentTarget.value, dueDate, false);
  }

  // When the checkbox is clicked, update the task's completed status.
  async function handleCheckboxClick() {
    // Need to use a variable to store the new checked state because
    // setIsChecked is asynchronous and will not update the state immediately.
    // So our if statement below would read the old state.
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    // Wait a short delay before updating the task's completed status for a smoother transition.
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Update the task client-side and server-side.
    if (newCheckedState) {
      updateTaskHandler(uuid, description, dueDate, true);
    } else {
      updateTaskHandler(uuid, description, dueDate, false);
    }
  }

  // When the delete button for a task is clicked, delete the task.
  function handleDeleteTaskClick() {
    deleteTaskHandler(uuid);
  }
}

// Format and return the due date to be displayed in the task.
function formatDueDate(dueDate) {
  if (dueDate === "" || dueDate === null) {
    return "";
  }

  const date = new Date(dueDate); // due date in Date object format
  const currentDate = new Date(); // current date in Date object format
  const localeTimeOptions = {
    // options for formatting the time
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  let writtenMonth = months[date.getMonth()];
  let writtenTime = date.toLocaleTimeString(undefined, localeTimeOptions);

  // If the task is due this year, don't display the year.
  if (date.getFullYear() === currentDate.getFullYear()) {
    return `${writtenMonth} ${date.getDate()}, ${writtenTime}`;
  }
  // If the task is not due this year, display the year.
  return `${writtenMonth} ${date.getDate()}, ${date.getFullYear()}, ${writtenTime}`;
}

export default Task;
