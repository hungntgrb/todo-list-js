import { tasks, renderTaskList, saveTasksToLocalStorage } from "../app";

export function getTaskObj(_tasks_, id_) {
  return _tasks_.find((t) => t.id === id_);
}
export function toggleDone(task_) {
  task_.done = !task_.done;
}
export function collectAllTaskElems() {
  return document.querySelectorAll(".task");
}
export function collectAllTaskTextElems() {
  return document.querySelectorAll(".task-text");
}
export function changeTaskStatus(e) {
  console.log("'Done' status changed!");
  toggleDone(getTaskObj(tasks, e.currentTarget.parentElement.id));
  saveTasksToLocalStorage();
}
export function listenToClick() {
  console.log("  Tasks are listening for click!");
  const taskElems = collectAllTaskTextElems();
  taskElems.forEach((el) => {
    el.addEventListener("click", changeTaskStatus);
  });
}
