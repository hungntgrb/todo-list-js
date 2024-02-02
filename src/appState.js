import { Task } from "./models";
import { retrieveTasksFromLocalStorage } from "./storage";

class AppState {
  constructor() {
    this.tasks = [];
    this.isEditing = false;
    this.editingTask = null;
    this.editingElem = null;
    this.alertTimeOutId = null;
  }

  setTaskList(arrayOfTasks) {
    this.tasks = arrayOfTasks;
  }
  clearTaskList() {
    this.tasks = [];
  }

  editingOn() {
    this.isEditing = true;
  }
  editingOff() {
    this.isEditing = false;
  }

  setEditingTask(taskId) {
    this.editingTask = this.tasks.find((t) => t.id === taskId);
  }
  clearEditingTask() {
    this.editingTask = null;
  }

  toggleDone(taskId) {
    this.tasks.find((t) => t.id === taskId).toggleDone();
  }

  setEditingElem(elem_) {
    this.editingElem = elem_;
  }
  clearEditingElem() {
    this.editingElem = null;
  }

  setAlertTimeOutId(timeOutId) {
    window.clearTimeout(this.alertTimeOutId);
    this.alertTimeOutId = timeOutId;
  }
  clearAlertTimeOutId() {
    this.alertTimeOutId = null;
  }

  refresh() {
    this.tasks = retrieveTasksFromLocalStorage().map(
      (obj) => new Task(obj.id, obj.text, obj.done)
    );
    this.isEditing = false;
    this.editingTask = null;
    this.editingElem = null;
    this.alertTimeOutId = null;
  }

  toTasksArray() {
    return this.tasks.map((t) => ({ id: t.id, text: t.text, done: t.done }));
  }

  toNormalMode() {
    this.isEditing = false;
    this.editingTask = null;
    this.editingElem = null;
  }

  toEditingMode(taskId) {
    this.isEditing = true;
    this.editingTask = this.tasks.find((t) => t.id === taskId);
    this.editingElem = null;
  }

  logToConsole() {
    console.log(this);
  }
}

const appState = new AppState();

export default appState;

export const noTaskTemplate = `<div class="no-task">No tasks to show!</div>`;
