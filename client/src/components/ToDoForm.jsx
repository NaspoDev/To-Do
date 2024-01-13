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
        <button className="due-date-button">
          <i className="fa-solid fa-calendar icon"></i>
        </button>

        {/* Submit new to-do button */}
        <button className="submit-to-do-button">
          <i className="fa-solid fa-plus icon"></i>
        </button>
      </div>

      <p className="error-msg hidden">You cannot submit an empty to-do!</p>
    </form>
  );
}

export default ToDoForm;
