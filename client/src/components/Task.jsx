// Task component. The actual task item that will be displayed in the list.

function Task({ description, dueDate }) {
  return (
    <li className="Task">
      <p className="task-description">{description}</p>
      <p className="task-due-date">{dueDate}</p>
    </li>
  );
}

export default Task;
