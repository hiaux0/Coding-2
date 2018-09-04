import {bindable} from 'aurelia-framework';
import './code-block-map.less'

const codeBlocks = [
  {
    id: "NybJ_1rwH",
    content: `
highlightLine(event) {
  this.mouseX = event.x;
  this.mouseY = event.y;
  this.showRadialContextMenu = true;

  let target = event.target
  let lineNumberDiv = this.correctHighlightElement(target, LINE_NUMBER_CLASS);
  if (lineNumberDiv) {
    lineNumberDiv.classList.toggle(HIGHLIGHT_CODE_LINE_CLASS);
  }
  event.stopPropagation();
}`
  },
  {
    id: "dasd90ijelkd",
    content: "Hello World"
  }
];

const zoomLevels = [
  ["0.15", "0.3", "0.45"],
  ["0.75", "1", "1.25"],
  ["1.50", "1.75", "2"],
]

export class CodeBlockMap {
  @bindable value;

  constructor() {
    this.codeBlocks = codeBlocks;
    this.scaleCoords = 1;
  }

  addCodeBlock() {
    let newCodeBlock = {
      id: Date.now().toString(25),
      content: 'Hello World',
    }
    this.codeBlocks.push(newCodeBlock);
  }

  setZoomLevel(zoomValue) {
    this.scaleCoords = 1 / zoomValue;
    let mprc = document.getElementsByClassName('markdown-parser-result-container');

    for (let container of mprc) {
      let containerX = container.getAttribute('data-x') || 0;
      let containerY = container.getAttribute('data-y') || 0;

      container.style.transform =
        `translate(${containerX}px, ${containerY}px) scale(${zoomValue}, ${zoomValue})`
    }

  }
  
}

