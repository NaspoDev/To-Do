// ToDoForm component.
// This component is responsible for adding new tasks to the list.

const hiddenClass = "hidden";

function ToDoForm({ addTask }) {
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
      <div className="due-date-selector-container">
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

  // Submit's form data to the server.
  function handleFormSubmit(event) {
    console.log("submit event fired!");
    // Prevent the form from refreshing the page on submit.
    event.preventDefault();

    // If the input value is blank (only whitespace), don't add a new task.
    if (document.getElementById("to-do-input").value.trim().length === 0) {
      return;
    }

    // Create and add a new task to the ToDoList.
    let newTask = {
      description: document.getElementById("to-do-input").value,
      dueDate: document.getElementById("due-date-selector").value,
    };

    addTask(newTask);

    // Clear the form.
    document.getElementById("to-do-input").value = "";
    document.getElementById("due-date-selector").value = "";

    // TODO: Submit the form data to the server.
  }
}

// Handles what happens when the due date button is clicked.
function handleDueDateClick() {
  // If the due date selector is hidden, reveal it.
  if (
    document.getElementById("due-date-selector").classList.contains(hiddenClass)
  ) {
    document.getElementById("due-date-selector").classList.remove(hiddenClass);
    document.getElementById("due-date-selector").focus();
  } else {
    // Otherwise, hide it.
    document.getElementById("due-date-selector").classList.add(hiddenClass);
  }
}

export default ToDoForm;
