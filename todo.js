export class Todo {
  constructor(id, task, completed) {
    this.id = id;
    this.task = task;
    this.completed = completed;
  }
}

export class TodoList {
  constructor() {
    this.items = [];
  }

  initializeWithCachedTodos(ul) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.items = todos.map(
      (todo) => new Todo(todo.id, todo.task, todo.completed)
    );
    this.renderToPage(ul);
  }

  addTodo(todo, ul) {
    this.items.push(todo);
    this.saveTodoToLocalStorage();
    this.renderToPage(ul);
  }

  removeTodoById(id, ul) {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveTodoToLocalStorage();
    this.renderToPage(ul);
  }

  markTodoAsCompleted(id, ul) {
    const todo = this.items.find((item) => item.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodoToLocalStorage();
      this.renderToPage(ul);
    }
  }

  saveTodoToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.items));
  }

  renderToPage(ul) {
    ul.innerHTML = "";

    this.items.forEach((item) => {
      const li = document.createElement("li");

      const status = item.completed ? "completed" : "incomplete";
      const icon = item.completed ? "fa-check-circle" : "fa-solid fa-check";
      const statusTextClass = item.completed
        ? "completed-text"
        : "incomplete-text";

      li.innerHTML = `
        <span class="task ${status}">${item.task}</span>
        <button class="complete-button" data-id="${item.id}">
          <i class="fas ${icon}"></i>
        </button>
        <button class="delete-button" data-id="${item.id}">
          <i class="fas fa-trash"></i>
        </button>
        <span class="${statusTextClass}">${
        item.completed ? "Completed" : "Incomplete"
      }</span>
      `;

      ul.appendChild(li);
    });

    const completeButtons = ul.querySelectorAll(".complete-button");
    completeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = parseInt(event.currentTarget.getAttribute("data-id"));
        this.markTodoAsCompleted(id, ul);
      });
    });

    const deleteButtons = ul.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = parseInt(event.currentTarget.getAttribute("data-id"));
        this.removeTodoById(id, ul);
      });
    });
  }
}
