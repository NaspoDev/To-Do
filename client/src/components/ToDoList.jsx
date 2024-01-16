// ToDoList component. This component is responsible for displaying the list of tasks.

import Task from "./Task";

function ToDoList({ tasks, deleteTaskHandler }) {
  return (
    <div className="ToDoList">
      <ul>
        {tasks.map((task, index) => {
          return (
            <Task
              key={index}
              description={task.description}
              dueDate={task.dueDate}
              id={index}
              deleteTaskHandler={deleteTaskHandler}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ToDoList;
