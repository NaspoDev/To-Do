// Task component. The actual task item that will be displayed in the list.

function Task({ description, dueDate, id, deleteTaskHandler }) {
  return (
    <li className="Task">
      <input type="checkbox" className="task-checkbox" />

      <div className="task-content-container">
        <p className="task-description">{description}</p>
        <p className="task-due-date">{dueDate}</p>
      </div>

      <div className="delete-task-button-container">
        <button
          className="delete-task-button"
          onClick={() => {
            // Delete the task client-side.
            deleteTaskHandler(id);

            // TODO: Delete task server-side.
          }}
        >
          <i className="fa-solid fa-trash icon"></i>
        </button>
      </div>
    </li>
  );
}

export default Task;
