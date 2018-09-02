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



export class CodeBlockMap {
  @bindable value;

  constructor() {
    this.codeBlocks = codeBlocks;
  }

  addCodeBlock() {
    let newCodeBlock = {
      id: Date.now().toString(25),
      content: 'Hello World',
    }
    this.codeBlocks.push(newCodeBlock);
  }

  
}
