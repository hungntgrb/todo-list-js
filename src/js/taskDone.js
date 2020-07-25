export function getTaskObj(_tasks_, id_) {
  return _tasks_.find((t) => t.id === id_);
}
export function toggleDone(task_) {
  task_.done = !task_.done;
}
export function collectAllTaskElems() {
  return document.querySelectorAll(".task");
}
export function changeTaskStatus(e) {
  console.log("Changed!");
}
export function listenToClick() {
  const taskElems = collectAllTaskElems();
  taskElems.forEach((el) => {
    el.addEventListener("click", changeTaskStatus);
  });
}
