// ToDoList component. This component is responsible for displaying the list of tasks.

import ToDo from "./ToDo";

function ToDoList({ tasks }) {
  return (
    <div className="ToDoList">
      <ul>
        {tasks.map((task, index) => {
          return (
            <ToDo
              key={index}
              description={task.description}
              dueDate={task.dueDate}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ToDoList;
