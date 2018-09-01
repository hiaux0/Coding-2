import {bindable, inject, observable} from 'aurelia-framework';
import {CommandCentral} from '../../common/command-central'
import {initMonaco, renderMarkdown} from './markdown-parser-custom';
import {functionMapRCM} from '../../storages/radial-context-menus';
import {debounce} from 'lodash-decorators';

import './markdown-parser.less';

const LINE_NUMBER_CLASS = 'line-number';
const HIGHLIGHT_CODE_LINE_CLASS = 'highlight-code-line-class';

@inject(CommandCentral)
export class MarkdownParser {
  @bindable null = false;

  @observable inputValue = `\`\`\` js
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
}
\`\`\``;

  @debounce(250)
  inputValueChanged() {
    this.activateSortable = false;
    setTimeout(() => {
      this.convertToHtml();
    }, 0)
  }

  autoFocus = true;

  constructor(commandCentral) {
    this.commandCentral = commandCentral;
    this.functionMapRCM = functionMapRCM;

    this.result = "";
    this.insertCodeRef = null;
    this.draggableName = "";
    this.sortableContext = "";
    this.segmentedButtonText = "Code";

    this.mouseX = 0;
    this.mouseY = 0;
    this.showRadialContextMenu = false;
    this.isEditMode = true;
  }

  attached() {
    this.commandCentral.subscribeToCommandEvents({
      marked_convertToHtml: this.convertToHtml,
    })
    this.convertToHtml()
  }

  /**
   * Use markdown-it to convert given markdown to html.
   */
  convertToHtml = () => {
    let input;
    console.log('TCL: MarkdownParser -> convertToHtml -> this.inputValue', this.inputValue);
    if (this.segmentedButtonText === 'Code') {
      console.log('in code mode')
      input = `\`\`\` js\n${this.inputValue}`;
    } else {
      input = this.inputValue;
    }
    
    console.log('TCL: MarkdownParser -> convertToHtml -> input', input);
    this.result = renderMarkdown(input)
    console.log('MarkdownParser -> convertToHtml -> this.result', this.result);
    this.splittedLines = this.createLineNumbers(this.result);

    this.draggableName = `.${LINE_NUMBER_CLASS}`;
    this.sortableContext = 'code';
    this.activateSortable = true;
  }

  /**
   * Split the lines from `result` in order to be able to better manipulate them.
   * @param {String} result - The result returned from markdown-it renderer
   */
  createLineNumbers(result) {
    let resultArr = [];
    // There is surely a better way how to do that..
    let filter = result.replace(/<pre><code (.*?)>/g, "")
                       .replace("</code></pre>", "");
    let splittedLine = filter.split(/[\n\r]/g);

    splittedLine.forEach((line) => {
      resultArr.push(line);
    })
    return resultArr;
  }

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
  }

  /**
   * Check if the (double) click target has specific class.
   * TODO_LATER: The logic can certainly be prettier --> do while loop
   * @param {HTMLElement} target
   * @returns {HTMLElement || Boolean} Returns HtmlElement on positive result.
   */
  correctHighlightElement(target, className) {
    if (target.classList.contains(className)) {
      return target;
    } else if (target.parentElement.classList.contains(className)) {
      return target.parentElement;
    } else if (target.parentElement.parentElement.classList.contains(className)) {
      return target.parentElement.parentElement;
    }
    return null;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  setSegmentedButtonText(text) {
    this.segmentedButtonText = text;
  }
}
