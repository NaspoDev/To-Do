// Task component. The actual task item that will be displayed in the list.

function Task({ description, dueDate, id, deleteTaskHandler }) {
  return (
    <li className="Task">
      <input type="checkbox" className="task-checkbox" />

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
        <p className="task-due-date">{dueDate}</p>
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

    // TODO: Update the task description in the database.
  }

  // When the delete button for a task is clicked, delete the task.
  function handleDeleteTaskClick() {
    // Delete the task client-side.
    deleteTaskHandler(id);

    // TODO: Delete task server-side.
  }
}

export default Task;
