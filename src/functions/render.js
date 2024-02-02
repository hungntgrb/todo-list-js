import { btnText } from "../appConfig";
import appState, { noTaskTemplate } from "../appState";

const taskListElem = document.querySelector(".taskList");
const submitBtn = document.querySelector(".submitBtn");
const clearBtn = document.querySelector(".clearBtn");
const inputElem = document.getElementById("todo");

export function renderTaskList() {
  if (appState.tasks.length > 0) {
    taskListElem.innerHTML = appState.tasks.map((t) => t.toHTML()).join("");
  } else {
    taskListElem.innerHTML = noTaskTemplate;
  }
}

export function renderSubmitBtn() {
  if (appState.isEditing) {
    submitBtn.classList.add("edit");
    submitBtn.textContent = btnText.save;
  } else {
    submitBtn.classList.remove("edit");
    submitBtn.textContent = btnText.add;
  }
}

export function renderClearButton() {
  if (appState.tasks.length > 0) {
    clearBtn.classList.add("show");
  } else {
    clearBtn.classList.remove("show");
  }
}

export function renderEditingNoti() {
  if (appState.isEditing) {
    taskListElem.insertAdjacentHTML(
      "beforebegin",
      `<div class="editingNoti">Editing...</div>`
    );
  } else {
    return;
  }
}

export function removeAlertElem() {
  const alertElem = document.querySelector("#alertElem");
  if (alertElem !== null) {
    alertElem.remove();
  }
}

export function setInputValue(value) {
  inputElem.value = value;
}

export function clearInputValue() {
  inputElem.value = "";
}
