// ToDoList component. This component is responsible for displaying the list of tasks.

import Task from "./Task";
import { useState } from "react";

function ToDoList({ tasks, deleteTaskHandler, updateTaskHandler }) {
  // List state to display. 0 = active tasks (incomplete tasks), 1 = completed tasks
  const [listState, setListState] = useState(0);

  // Filter the tasks based on the list state.
  // If the list state is 0, return all tasks that are not completed,
  // otherwise return all tasks that are completed.
  const filteredTasks = tasks.filter((task) => {
    return listState === 0 ? !task.completed : task.completed;
  });

  return (
    <div className="ToDoList">
      <div className="list-content">
        <ul>
          {filteredTasks.map((task, index) => {
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
