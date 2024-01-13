// ToDoForm component.
// This component is responsible for adding new tasks to the list.

function ToDoForm() {
  const newToDoPlaceholder = "New To-Do";
  const newToDoMaxLength = 200;

  return (
    <form
      action=""
      className="ToDoForm"
      onSubmit={(event) => {
        // Prevent the form from refreshing the page on submit.
        event.preventDefault();
      }}
    >
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
          onClick={() => {
            // Reveal the due date selector (input type=datetime-local).
            document.getElementById("due-date-selector").focus();
          }}
        >
          <i className="fa-solid fa-calendar icon"></i>
        </button>

        {/* Submit new to-do button */}
        <button className="submit-to-do-button">
          <i className="fa-solid fa-plus icon"></i>
        </button>
      </div>

      {/* Hidden by default. To be used when the due date button is clicked. */}
      <input type="datetime-local" id="due-date-selector" />
    </form>
  );
}

export default ToDoForm;
