// ToDoList component. This component is responsible for displaying the list of tasks.

import Task from "./Task";
import { useState } from "react";
import IMAGES from "../assets/images/images";

function ToDoList({ tasks, deleteTaskHandler, updateTaskHandler }) {
  // List state to display. 0 = active tasks (incomplete tasks), 1 = completed tasks
  const [listState, setListState] = useState(0);

  return (
    <div className="ToDoList">
      <div className="list-content">
        <ul>
          {tasks.map((task) => {
            // If the list state is 0 (active), render all tasks that are not completed.
            if (listState === 0 && !task.completed) {
              return (
                <Task
                  key={task.uuid}
                  description={task.description}
                  dueDate={task.dueDate}
                  completed={task.completed}
                  uuid={task.uuid}
                  deleteTaskHandler={deleteTaskHandler}
                  updateTaskHandler={updateTaskHandler}
                />
              );
              // If the list state is 1 (completed), render all tasks that are completed.
            } else if (listState === 1 && task.completed) {
              return (
                <Task
                  key={task.uuid}
                  description={task.description}
                  dueDate={task.dueDate}
                  completed={task.completed}
                  uuid={task.uuid}
                  deleteTaskHandler={deleteTaskHandler}
                  updateTaskHandler={updateTaskHandler}
                />
              );
            }
          })}
        </ul>
      </div>
      <div className="list-footer">
        <button className="toggle-list-state-button" onClick={toggleListState}>
          {listState === 0 ? "Show Completed" : "Show Active"}
        </button>
        <div className="creator-credit-container">
          <a
            href="https://github.com/NaspoDev/To-Do-WebApp"
            target="_blank"
            rel="noreferrer"
          >
            <img className="github-icon" src={IMAGES.githubIcon} alt="Github" />
          </a>
          <p className="credit-tag">
            Created by{" " /* Add a space before "Naspo"*/}
            <a href="https://naspo.dev/" target="_blank" rel="noreferrer">
              Naspo
            </a>
            .
          </p>
          {/* At mobile sizing, this is displayed instead of regular .credit-tag */}
          <p className="credit-tag-mobile">
            <a href="https://naspo.dev/" target="_blank" rel="noreferrer">
              Naspo
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  // Toggle the list state between active and completed.
  function toggleListState() {
    setListState(listState ? 0 : 1);
  }
}

export default ToDoList;
