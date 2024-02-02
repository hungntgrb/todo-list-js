export const localStorageNames = {
  taskList: "taskList",
};

export function saveTasksToLocalStorage(tasksArray) {
  window.localStorage.setItem(
    localStorageNames.taskList,
    JSON.stringify(tasksArray)
  );
}

export function retrieveTasksFromLocalStorage() {
  let fromLS = window.localStorage.getItem(localStorageNames.taskList);
  if (fromLS === null) return [];

  fromLS = JSON.parse(fromLS);
  if (!Array.isArray(fromLS)) return [];

  return fromLS;
}
