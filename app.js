let tasks = [
  { text: "AAA", id: "123", done: false },
  { text: "BBB", id: "234", done: false },
];
const ALERT_TIMEOUT = 3000;
const DANGER = "danger";
const SUCCESS = "success";
let isEditing = false;
const MESSAGES = {
  ITEM_ADDED: "Item added!",
  ITEM_REMOVED: "Item removed!",
  ITEM_CHANGED: "Item changed!",
  EMPTY_NEW: "Nothing to add to tasks!",
  EMPTY_UPDATE: "Nothing to update!",
  NEW_TASK: "New task added!",
};
const alert = document.querySelector(".alert");
const form = document.querySelector(".todo-form");
const input = document.getElementById("todo");
const list = document.querySelector(".task-container");
const clearBtn = document.querySelector(".clear-btn");
const submitBtn = document.querySelector(".submit-btn");

function Task(text, id = "9999", done = false) {
  this.text = text;
  this.done = done;
  this.id = id;
}
function setInput(val) {
  input.value = val;
}

function showAlert(text, type) {
  alert.textContent = text;
  alert.classList.add("show");
  alert.classList.add(type);
  setTimeout(() => {
    alert.className = "alert";
  }, ALERT_TIMEOUT);
}
function resetState() {
  isEditing = false;
  setInput("");
}
function taskToHTML(t) {
  return `<article class="task">
    <span class=".task-text">${t.text}</span>
    <span class="btn-group">
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
        <path fill-rule="evenodd"
          d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
      </svg>
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path fill-rule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
      </svg>
    </span>
  </article>`;
}
function timeStamp() {
  return new Date().getTime().toString();
}
function renderTaskList() {
  list.innerHTML = tasks.map(taskToHTML).join("");
  if (tasks.length > 0) {
    clearBtn.classList.add("show");
  } else {
    clearBtn.className = "clear-btn";
  }
}
function handleSubmit(e) {
  e.preventDefault();
  const inputValue = input.value;

  if (!inputValue && !isEditing) {
    showAlert(MESSAGES.EMPTY_NEW, DANGER);
  } else if (!inputValue && isEditing) {
    showAlert(MESSAGES.EMPTY_UPDATE, DANGER);
  } else if (inputValue && !isEditing) {
    const newTask = new Task(inputValue, timeStamp());
    tasks.unshift(newTask);
    showAlert(MESSAGES.NEW_TASK, SUCCESS);
  } else if (inputValue && isEditing) {
    console.log("Task updated!");
  }
  renderTaskList();
  resetState();
  renderSubmitBtn();
}

function removeAllItems() {
  tasks = [];
  renderTaskList();
}
function grabAssociatedText(btn) {
  return btn.parentElement.previousElementSibling.textContent;
}
function editOn(e) {
  isEditing = true;
  const text = grabAssociatedText(e.currentTarget);
  setInput(text);
  renderSubmitBtn();
}
function removeItem() {
  console.log("Item removed!");
}

function renderSubmitBtn() {
  if (isEditing) {
    submitBtn.style.backgroundColor = "rgb(255, 210, 210)";
    submitBtn.textContent = "save";
  } else {
    submitBtn.style.backgroundColor = "#a2b6ff";
    submitBtn.textContent = "submit";
  }
}

renderTaskList();

form.addEventListener("submit", handleSubmit);
clearBtn.addEventListener("click", removeAllItems);
// ---
function listenToModify() {
  const taskElems = document.querySelectorAll(".task");
  taskElems.forEach((elem) => {
    const editBtn = elem.querySelector(".bi-pencil");
    const deleteBtn = elem.querySelector(".bi-trash");

    editBtn.addEventListener("click", editOn);
    deleteBtn.addEventListener("click", removeItem);
  });
}

setInterval(listenToModify, 100);
