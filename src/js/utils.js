import { handleTaskClick } from "../functions/eventListener";
import { renderTaskList } from "../functions/render";

export function breakDownLong(text) {
  if (/\S{25,}/.test(text)) {
    const chunk = 15;
    let l = [];
    let i = 0;
    while (i < text.length) {
      l.push(text.slice(i, i + chunk));
      i += chunk;
    }
    return l.join(" ");
  }
  return text;
}

export function preventParagraph(text) {
  if (text.length > 150) {
    return "Too long!";
  }
  return text;
}

export function removeHTML(text) {
  return text.replace(/<\/?.*?>/g, "");
}

export function zeroLengthOrAllSpace(text) {
  if (/^\s*$/.test(text)) {
    return "!NOINPUT";
  }
  return text;
}

export function isHTML(text) {
  let match = text.match(/<\w*?>|<\/\w*?>/);
  if (match === null) {
    return false;
  } else {
    window.alert("Malcious Attempt!");
    return true;
  }
}

export function escapeHTML(text) {
  return text.replace(/<\/\w*?>/gi, "");
}

export function escapeTag(text) {
  return text.replace(/<\w*?>/gi, "");
}

export function sanitizeInput(value_) {
  let t = escapeHTML(value_);
  t = escapeTag(t);
  return t;
}

export function cleanUserInput(text) {
  return breakDownLong(preventParagraph(sanitizeInput(text)));
}

// ---------------------------------------------------
export function renderEditingElemColor() {
  if (appState.isEditing) {
    editingElem.style.background = colors.editing;
  } else {
    editingElem.style.background = colors.notEditing;
  }
}

export function hideEditingNoti() {
  document.querySelector(".editingNoti").remove();
}

export function listenToModify() {
  const taskElems = collectAllTaskElems();
  taskElems.forEach((elem) => {
    const editBtn = elem.querySelector(".bi-pencil");
    const deleteBtn = elem.querySelector(".bi-trash");

    editBtn.addEventListener("click", intoEditingMode);
    deleteBtn.addEventListener("click", removeItem);
  });
}
// ------------------------------------------

export function grabAssociatedText(btn) {
  return btn.parentElement.previousElementSibling.textContent;
}

export function grabTaskItem(btn) {
  return btn.parentElement.parentElement;
}

export function grabTaskTextElem(btn) {
  return btn.parentElement.previousElementSibling;
}

export function grabTaskId(btn) {
  return btn.parentElement.parentElement.id;
}

export function setTaskText(idx, txt) {
  tasks.find((t) => t.id === idx).text = txt;
}

export function hexToken(size) {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

export function renderTaskListAndListen() {
  renderTaskList();

  document.querySelectorAll(".task").forEach((t) => {
    t.addEventListener("click", handleTaskClick);
  });
}
