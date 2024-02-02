import "./main.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
import appState from "./appState";
import { handleClearAll, handleSubmit } from "./functions/eventListener";
import { renderTaskListAndListen } from "./js/utils";

window.addEventListener("DOMContentLoaded", main);

function main() {
  const formElem = document.querySelector(".todoForm");
  const inputElem = document.getElementById("todo");
  const clearBtn = document.querySelector(".clearBtn");

  inputElem.focus();

  appState.refresh();

  renderTaskListAndListen();

  formElem.addEventListener("submit", handleSubmit);
  clearBtn.addEventListener("click", handleClearAll);
}
