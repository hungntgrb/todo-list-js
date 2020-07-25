console.log("app.js runs!");
import { sanitizeInput } from "./escapeUserInput";
import { displayAlert, hideAlertMsg } from "./AlertComponent";
import "./main.scss";
import {
  changeTaskStatus,
  collectAllTaskElems,
  collectAllTaskTextElems,
  listenToClick,
} from "./js/taskDone";

export let tasks = [];
loadTasksFromLocalStorage();

// export let tasks = [
//   { text: "1QWERTYUIOP", id: "123654", done: true },
//   { text: "2ASDFGHJKL", id: "908743", done: false },
//   { text: "3QWERTYUIOP", id: "345123", done: true },
//   { text: "4ASDFGHJKL", id: "1g55jj5", done: false },
// ];

const ALERT_TIMEOUT = 2600;
const DANGER = "danger";
const SUCCESS = "success";
let isEditing = false;
let editingID = "";
let editingElem = null;
let editingText = "";
const COLORS = { EDITING: "rgb(192, 255, 252)" };
const MESSAGES = {
  ITEM_ADDED: "Item added!",
  ITEM_REMOVED: "Item removed!",
  ITEM_UPDATED: "Item updated!",
  EMPTY_NEW: "Nothing to add!",
  EMPTY_UPDATE: "Nothing to update!",
  NEW_TASK: "New task added!",
  ALL_CLEARED: "Removed all items!",
};
const CONTAINER = document.querySelector(".container");
const alert = document.querySelector(".alert");
const form = document.querySelector(".todo-form");
const input = document.getElementById("todo");
const list = document.querySelector(".task-container");
const clearBtn = document.querySelector(".clear-btn");
const submitBtn = document.querySelector(".submit-btn");
const SUBMIT = { SAVE: "save", ADD: "add" };
let TIMEOUT = 9898;
const noTaskTemplate = `<p class="no-task">No tasks to show!</p>`;
// ============ FUNCTIONS =================
function resetTimeout() {
  clearTimeout(TIMEOUT);
}
function updateTaskTextFromInput() {
  if (editingElem === null) {
    return;
  }
  editingElem.firstElementChild.textContent = input.value;
}
function Task(text, id = "9999zxw", done = false) {
  this.text = text;
  this.id = id;
  this.done = done;
}
function setInput(val) {
  input.value = val;
}

function resetState() {
  isEditing = false;
  setInput("");
  editingID = "";
  editingElem = null;
  editingText = "";
  renderSubmitBtn();
  renderTaskList();
}
function taskToHTML(t) {
  return `<article class="task ${t.done ? "done" : ""}" id=${
    t.id
  } draggable="true">
    <span class="task-text">${t.text}</span>
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
export function renderTaskList() {
  if (tasks.length > 0) {
    list.innerHTML = tasks.map(taskToHTML).join("");
  } else {
    list.innerHTML = noTaskTemplate;
  }

  listenToClick();
  renderClearButton();
}
function renderClearButton() {
  if (tasks.length > 0) {
    clearBtn.classList.add("show");
  } else {
    clearBtn.className = "clear-btn";
  }
}
function displayAlertThenHide(text, color, elem) {
  resetTimeout();
  hideAlertMsg();
  displayAlert(text, color, elem);
  TIMEOUT = setTimeout(hideAlertMsg, ALERT_TIMEOUT);
}
function inAddingModeAndNoInput(input_) {
  return !input_ && !isEditing;
}
function inEditModeAndNoInput(input_) {
  return !input_ && isEditing;
}
function handleSubmit(e) {
  e.preventDefault();
  resetTimeout();
  hideEditing();
  let inputValue = sanitizeInput(input.value);

  if (inAddingModeAndNoInput(inputValue)) {
    displayAlertThenHide(MESSAGES.EMPTY_NEW, DANGER, CONTAINER);
  } else if (inEditModeAndNoInput(inputValue)) {
    displayAlertThenHide(MESSAGES.EMPTY_UPDATE, DANGER, CONTAINER);
  } else if (inputValue && !isEditing) {
    const newTask = new Task(inputValue, timeStamp());
    tasks.unshift(newTask);
    displayAlertThenHide(MESSAGES.NEW_TASK, SUCCESS, CONTAINER);
  } else if (inputValue && isEditing) {
    setTaskText(editingID, inputValue);
    displayAlertThenHide(MESSAGES.ITEM_UPDATED, SUCCESS, CONTAINER);
  }

  resetState();
  saveTasksToLocalStorage();
}

function grabAssociatedText(btn) {
  return btn.parentElement.previousElementSibling.textContent;
}
function grabTaskItem(btn) {
  return btn.parentElement.parentElement;
}
function grabTaskTextElem(btn) {
  return btn.parentElement.previousElementSibling;
}
function setTaskText(idx, txt) {
  tasks.find((t) => t.id === idx).text = txt;
}
function editingOn(e) {
  if (isEditing) {
    return;
  }
  showEditing();
  const editButton = e.currentTarget;

  editingElem = grabTaskItem(editButton);
  changeColorToEditing();
  editingText = grabAssociatedText(editButton);
  editingID = grabTaskItem(editButton).id;
  setInput(editingText);
  isEditing = true;
  renderSubmitBtn();
}
function changeColorToEditing() {
  if (isEditing) {
    return;
  } else if (editingElem === null) {
    return;
  }
  editingElem.style.backgroundColor = COLORS.EDITING;
}
function removeItem(e) {
  const ok = window.confirm("Delete task?");
  if (ok) {
    resetTimeout();
    const elem = grabTaskItem(e.currentTarget);
    tasks = tasks.filter((t) => t.id !== elem.id);
    saveTasksToLocalStorage();
    displayAlertThenHide(MESSAGES.ITEM_REMOVED, SUCCESS, CONTAINER);
    renderTaskList();
    resetState();
  } else {
    return;
  }
}
function removeAllItems() {
  const ok = window.confirm("Delete all tasks?");
  if (ok) {
    resetTimeout();
    tasks = [];
    saveTasksToLocalStorage();
    displayAlertThenHide(MESSAGES.ALL_CLEARED, SUCCESS, CONTAINER);
    renderTaskList();
  } else {
    return;
  }
}

export function saveTasksToLocalStorage() {
  localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}
function loadTasksFromLocalStorage() {
  tasks = JSON.parse(localStorage.getItem("todo-tasks")) || [];
}

function renderSubmitBtn() {
  if (isEditing) {
    submitBtn.classList.add("edit");
    submitBtn.textContent = SUBMIT.SAVE;
  } else {
    submitBtn.classList.remove("edit");
    submitBtn.textContent = SUBMIT.ADD;
  }
}
function showEditing() {
  if (isEditing) {
    return;
  }
  list.insertAdjacentHTML(
    "beforebegin",
    `<div class="editingNoti">Editing...</div>`
  );
}
function hideEditing() {
  if (!isEditing) {
    return;
  }
  document.querySelector(".editingNoti").remove();
}

function listenToModify() {
  const taskElems = collectAllTaskElems();
  taskElems.forEach((elem) => {
    const editBtn = elem.querySelector(".bi-pencil");
    const deleteBtn = elem.querySelector(".bi-trash");

    editBtn.addEventListener("click", editingOn);
    deleteBtn.addEventListener("click", removeItem);
  });
}
// ------------------------------------------------------

window.onload = resetState;

renderTaskList();

form.addEventListener("submit", handleSubmit);

clearBtn.addEventListener("click", removeAllItems);

setInterval(listenToModify, 100);

input.oninput = updateTaskTextFromInput;
