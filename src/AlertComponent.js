import check_svg from "./pics/check.svg";
import x_svg from "./pics/xcircle.svg";
import appState from "./appState";
import { alertDuration } from "./appConfig";
import { removeAlertElem } from "./functions/render";

export function alertElem(text, color) {
  return `<div class="alert ${color}"
               id="alertElem">
            <span class="alertText"> ${text} </span>    
            <img class="alert-icon" src="${
              color === "danger" ? x_svg : check_svg
            }" alt="status-icon" onclick="this.parentElement.remove()" />
          </div>`;
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
