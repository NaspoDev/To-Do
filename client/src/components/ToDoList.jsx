// ToDoList component. This component is responsible for displaying the list of tasks.

import Task from "./Task";

function ToDoList({ tasks }) {
  return (
    <div className="ToDoList">
      <ul>
        {tasks.map((task, index) => {
          return (
            <Task
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
