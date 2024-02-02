// ToDoForm component.
// This component is responsible for adding new tasks to the list.

import apiUrl from "../api";
import { v4 as uuidv4 } from "uuid";
import Task from "../utility/Task";

const hiddenClass = "hidden";

function ToDoForm({ addTask, localStorageUserKey }) {
  const newToDoPlaceholder = "New To-Do";
  const newToDoMaxLength = 200;

  return (
    <form action="" className="ToDoForm" onSubmit={handleFormSubmit}>
      <div className="to-do-input-field">
        <input
          type="text"
          id="to-do-input"
          placeholder={newToDoPlaceholder}
          maxLength={newToDoMaxLength}
          required
        />

        {/* Due date button */}
        <button
          className="due-date-button"
          id="due-date-button"
          type="button"
          onClick={handleDueDateClick}
        >
          <i className="fa-solid fa-calendar icon"></i>
        </button>

        {/* Submit new to-do button */}
        <button className="submit-to-do-button" type="submit">
          <i className="fa-solid fa-plus icon"></i>
        </button>
      </div>

      {/* Hidden by default. To be used when the due date button is clicked. */}
      <div
        className="due-date-selector-container"
        id="due-date-selector-container"
      >
        <input
          type="datetime-local"
          id="due-date-selector"
          className="due-date-selector hidden"
          onBlur={(event) => {
            // Hide the due date selector when it loses focus.
            // (Unless the due date button was clicked, then let the due date button handle it).
            if (event.relatedTarget?.id !== "due-date-button") {
              document
                .getElementById("due-date-selector")
                .classList.add(hiddenClass);
            }
          }}
        />
      </div>
    </form>
  );

  // Submit's form data to the server to create a new task.
  async function handleFormSubmit(event) {
    // Prevent the form from refreshing the page on submit.
    event.preventDefault();

    // If the input value is blank (only whitespace), don't add a new task.
    if (document.getElementById("to-do-input").value.trim().length === 0) {
      return;
    }

    // Create and add a new task to the ToDoList.
    let newTask = new Task(
      document.getElementById("to-do-input").value,
      document.getElementById("due-date-selector").value,
      uuidv4()
    );

    addTask(newTask);

    // Clear the form.
    document.getElementById("to-do-input").value = "";
    document.getElementById("due-date-selector").value = "";

    // Create a new task in the database.
    // If there is no user for this session, create a new user.
    if (localStorage.getItem(localStorageUserKey) === null) {
      console.log("user is null!");
      // Create a new user.
      // Await the response to ensure the user is created before creating the task.
      await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          // Add the new user to local storage.
          localStorage.setItem(localStorageUserKey, data.result.insertId);
          console.log(`New user successfully created.`);
        })
        .catch((error) => {
          console.log(`Error creating user: ${error}`);
        });
    }

    // Create a new task.
    fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: newTask.description,
        dueDate: newTask.dueDate,
        userId: localStorage.getItem(localStorageUserKey),
        uuid: newTask.uuid,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`New task successfully created.`);
      })
      .catch((error) => {
        console.log(`Error creating task: ${error}`);
      });
  }

  // Handles what happens when the due date button is clicked.
  function handleDueDateClick() {
    // If the due date selector is hidden, reveal it.
    if (
      document
        .getElementById("due-date-selector")
        .classList.contains(hiddenClass)
    ) {
      document
        .getElementById("due-date-selector")
        .classList.remove(hiddenClass);
      document.getElementById("due-date-selector").focus();
    } else {
      // Otherwise, hide it.
      document.getElementById("due-date-selector").classList.add(hiddenClass);
    }
  }
}

export default ToDoForm;
