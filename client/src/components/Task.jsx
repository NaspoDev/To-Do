// Task component. The actual task item that will be displayed in the list.

function Task({ description, dueDate, id, deleteTaskHandler }) {
  return (
    <li className="Task">
      <input type="checkbox" className="task-checkbox" />

      <div className="task-content-container">
        <p className="task-description">{description}</p>
        <p className="task-due-date">{dueDate}</p>
      </div>

      <div className="other-task-actions-container">
        <button className="edit-task-button">
          <i className="fa-solid fa-pen-to-square icon"></i>
        </button>
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
