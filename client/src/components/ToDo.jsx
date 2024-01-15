// ToDo component. The actual task item that will be displayed in the list.

function ToDo({ description, dueDate }) {
  return (
    <li className="ToDo">
      <p className="to-do-description">{description}</p>
      <p className="to-do-due-date">{dueDate}</p>
    </li>
  );
}

export default ToDo;
