import {mainTheme} from './main-theme'

export function darkTheme() {
  let hioBody = document.getElementById("hio-body");
  hioBody.style.filter = "invert(0%)";
  document.body.style.background = mainTheme.mainClr;
}

export function lightTheme() {
  let hioBody = document.getElementById("hio-body");
  hioBody.style.filter = "invert(100%)";
  document.body.style.background = `rgb(203, 197, 191)`; // hardcoded invers of #343A40 (the current main clr theme 2018-08-12 16:24:58)
}
