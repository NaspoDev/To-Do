// Task frontend data class. (Only holds data that is useful to the frontend.)

class Task {
  constructor(description, dueDate, uuid) {
    this.description = description;
    this.dueDate = dueDate;
    this.uuid = uuid;

    this.completed = false;
  }
}

export default Task;
