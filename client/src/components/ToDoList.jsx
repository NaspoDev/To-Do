// ToDoList component. This component is responsible for displaying the list of tasks.

import Task from "./Task";
import { useState } from "react";

function ToDoList({ tasks, deleteTaskHandler, updateTaskHandler }) {
  // List state to display. 0 = active tasks (incomplete tasks), 1 = completed tasks
  const [listState, setListState] = useState(0);

  return (
    <div className="ToDoList">
      <div className="list-content">
        <ul>
          {tasks.map((task, index) => {
            // If the list state is 0 (active), render all tasks that are not completed.
            if (listState === 0 && !task.completed) {
              return (
                <Task
                  key={index}
                  description={task.description}
                  dueDate={task.dueDate}
                  completed={task.completed}
                  index={index}
                  deleteTaskHandler={deleteTaskHandler}
                  updateTaskHandler={updateTaskHandler}
                />
              );
              // If the list state is 1 (completed), render all tasks that are completed.
            } else if (listState === 1 && task.completed) {
              return (
                <Task
                  key={index}
                  description={task.description}
                  dueDate={task.dueDate}
                  completed={task.completed}
                  index={index}
                  deleteTaskHandler={deleteTaskHandler}
                  updateTaskHandler={updateTaskHandler}
                />
              );
            }
          })}
        </ul>
      </div>

      <div className="toggle-list-state-button-container">
        <button className="toggle-list-state-button" onClick={toggleListState}>
          {listState === 0 ? "Show Completed" : "Show Active"}
        </button>
      </div>
    </div>
  );

  // Toggle the list state between active and completed.
  function toggleListState() {
    setListState(listState ? 0 : 1);
  }
}

export default ToDoList;
