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
    
    const zoomer = function* increaseZoom() {
      for (let i = 0; i < 100; i++) {
        let hundredth = i / 100;
        let reset = yield hundredth;
        console.log('TCL: CodeBlockMap -> zoomer -> reset', reset);
        if (reset) {
          i = 0;
        }
      }
    }
    let zoom = zoomer();
    
    // window.addEventListener('wheel', (ev) => {
    //   let zoomValuePlus = zoom.next().value;
    //   if (zoomValuePlus < 0.9) {
    //     console.log('TCL: CodeBlockMap -> constructor -> zoomValuePlus', zoomValuePlus);
    //     this.codeBlockMapContainerRef.style.zoom = 1 + zoomValuePlus;
    //   } else {
    //     console.log('reset zoom')
    //     zoom.next(true)
    //   }
    //   ev.preventDefault();
    // })
  }

  addCodeBlock() {
    let newCodeBlock = {
      id: Date.now().toString(25),
      content: 'Hello World',
    }
    this.codeBlocks.push(newCodeBlock);
  }

  setZoomLevel(zoomValue) {
    console.log('TCL: CodeBlockMap -> setZoomLevel -> zoomValue', zoomValue);
    this.codeBlockMapContainerRef.style.zoom = zoomValue;
  }
  
}

