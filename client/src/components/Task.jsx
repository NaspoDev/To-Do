// Task component. The actual task item that will be displayed in the list.

import { months } from "../utility/dates";

function Task({
  description,
  dueDate,
  index,
  deleteTaskHandler,
  updateTaskHandler,
}) {
  return (
    <li className="Task">
      <input
        type="checkbox"
        className="task-checkbox"
        onChange={handleCheckboxClick}
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
    updateTaskHandler(index, event.currentTarget.value, dueDate, false);
  }

  // When the checkbox is clicked, update the task's completed status.
  function handleCheckboxClick(event) {
    if (event.currentTarget.checked) {
      updateTaskHandler(index, description, dueDate, true);
    } else {
      updateTaskHandler(index, description, dueDate, false);
    }
  }

  // When the delete button for a task is clicked, delete the task.
  function handleDeleteTaskClick() {
    deleteTaskHandler(index);
  }
}

// Format and return the due date to be displayed in the task.
function formatDueDate(dueDate) {
  if (dueDate === "") {
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
