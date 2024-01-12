// ToDoInput component.
// This component is responsible for adding new tasks to the list.

function ToDoInput() {
  const newToDoPlaceholder = "New To-Do";
  const newToDoMaxLength = 200;

  return (
    <form action="" className="to-do-input-form">
      <div className="to-do-input-field">
        <input
          type="text"
          id="to-do-input"
          placeholder={newToDoPlaceholder}
          maxLength={newToDoMaxLength}
          required
        />

        {/* Due date button */}
        <button className="due-date-button"></button>

        {/* Submit new to-do button */}
        <button className="submit-to-do-button"></button>
      </div>
    </form>
  );
}

export default ToDoInput;
