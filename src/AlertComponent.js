import check_svg from "./pics/check.svg";
import x_svg from "./pics/xcircle.svg";
console.log("checkSVG", check_svg);

export function alertElem(text, color) {
  return `<div class="alert ${color}">${text}
  <img class="alert-icon" src="${
    color === "danger" ? x_svg : check_svg
  }" alt="status-icon"/>
  </div>`;
}

export function displayAlert(text, color, elem) {
  elem.insertAdjacentHTML("afterbegin", alertElem(text, color));
  return `Alert showed!`;
}

export function hideAlertMsg() {
  document.querySelector(".alert").remove();
  return `Alert removed!`;
}
