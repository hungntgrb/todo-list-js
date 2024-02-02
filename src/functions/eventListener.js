import { alertSuccess, alertDanger } from "../AlertComponent";
import { saveTasksToLocalStorage } from "../storage";
import { messages } from "../appConfig";
import appState from "../appState";
import { cleanUserInput, renderTaskListAndListen } from "../js/utils";
import { Task } from "../models";
import { clearInputValue, renderSubmitBtn, setInputValue } from "./render";

const containerElem = document.querySelector(".main");
const inputElem = document.getElementById("todo");

export function handleSubmit(e) {
  e.preventDefault();

  let inputValue = cleanUserInput(inputElem.value);

  if (appState.isEditing) {
    if (inputValue) {
      appState.editingTask.setText(inputValue);

      alertSuccess(messages.itemUpdated, containerElem);

      appState.toNormalMode();

      renderSubmitBtn();
    } else if (!inputValue) {
      alertDanger(messages.emptyUpdate, containerElem);
    }
    // renderEditingElemColor();
  } else if (!appState.isEditing) {
    if (inputValue) {
      const newTask = new Task(null, inputValue);
      appState.tasks.unshift(newTask);

      alertSuccess(messages.newTaskAdded, containerElem);
    } else if (!inputValue) {
      alertDanger(messages.emptyNew, containerElem);
    }
  }

  clearInputValue();
  inputElem.focus();

  saveTasksToLocalStorage(appState.toTasksArray());

  renderTaskListAndListen();
}

export function handleClearAll() {
  const ok = window.confirm("Delete all tasks?");

  if (ok) {
    resetTimeout();
    tasks = [];
    saveTasksToLocalStorage(tasks);

    alertSuccess(messages.allCleared, containerElem);

    renderTaskListAndListen();

    if (isEditing) {
      hideEditingNoti();
    }

    resetState();
  } else {
    return;
  }
}

export function handleTaskClick(e) {
  const taskId = e.currentTarget.id;
  const taskText = e.currentTarget.querySelector(".taskText").textContent;

  if (e.target.classList.contains("taskText")) {
    // console.log("Click taskText");

    appState.toggleDone(taskId);
    saveTasksToLocalStorage(appState.toTasksArray());

    renderTaskListAndListen();
  } else if (e.target.classList.contains("btnDelete_ovl")) {
    // console.log("Click Trash");

    clearInputValue();
    appState.toNormalMode();
    renderSubmitBtn();
    inputElem.focus();

    appState.setTaskList(appState.tasks.filter((t) => t.id !== taskId));

    alertSuccess(messages.itemRemoved, containerElem);

    saveTasksToLocalStorage(appState.toTasksArray());
    renderTaskListAndListen();
  } else if (e.target.classList.contains("btnEdit_ovl")) {
    // console.log("Click Pencil");

    inputElem.focus();

    appState.toEditingMode(taskId);

    renderSubmitBtn();

    setInputValue(taskText);
  }
}
