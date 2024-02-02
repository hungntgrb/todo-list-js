import { alertDuration } from "./appConfig";
import appState from "./appState";
import { removeAlertElem } from "./functions/render";
import check_svg from "./pics/check.svg";
import x_svg from "./pics/xcircle.svg";

export function alertElem(text, color) {
  return `<div class="alert ${color}"
               id="alertElem">
                 ${text}
                <img class="alert-icon" src="${
                  color === "danger" ? x_svg : check_svg
                }" alt="status-icon"/>
          </div>`;
}

export function displayAlert(text, color, destElem) {
  destElem.insertAdjacentHTML("afterbegin", alertElem(text, color));
  return `Alert showed!`;
}

export function hideAlertMsg() {
  const alertDiv = document.querySelector(".alert");
  if (alertDiv === null) {
    return `No such element!`;
  } else {
    alertDiv.remove();
    return `Alert removed!`;
  }
}

export function alertSuccess(text, destElem) {
  removeAlertElem();

  destElem.insertAdjacentHTML("afterbegin", alertElem(text, "success"));

  appState.setAlertTimeOutId(window.setTimeout(removeAlertElem, alertDuration));
}

export function alertDanger(text, destElem) {
  removeAlertElem();
  destElem.insertAdjacentHTML("afterbegin", alertElem(text, "danger"));
  appState.setAlertTimeOutId(window.setTimeout(removeAlertElem, alertDuration));
}
