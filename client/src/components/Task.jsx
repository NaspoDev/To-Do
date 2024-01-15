// Task component. The actual task item that will be displayed in the list.

function Task({ description, dueDate }) {
  return (
    <li className="Task">
      <input type="checkbox" className="task-checkbox" />

      <div className="task-content-container">
        <p className="task-description">{description}</p>
        <p className="task-due-date">{dueDate}</p>
      </div>

      {/* <div className="other-task-actions-container">
        <button className="edit-task-button">Edit</button>
        <button className="delete-task-button">Delete</button>
      </div> */}
    </li>
  );
}

export default Task;
