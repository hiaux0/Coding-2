import {bindable, inject, observable} from 'aurelia-framework';
import {CommandCentral} from '../../../command-central'
import { renderMarkdown } from './render-markdown';
import {arrows, pencil} from '../../../styles/icons';
import {debounce} from 'lodash-decorators';

import './markdown-parser.less';

const LINE_NUMBER_CLASS = 'line-number';
const HIGHLIGHT_CODE_LINE_CLASS = 'highlight-code-line-class';
const DRAG_BUTTON_CLASS = 'drag-button';

@inject(CommandCentral)
export class MarkdownParser {
  @bindable content;
  @bindable codeLang = 'xml';
  @bindable scaleCoords;
  @bindable showMoreOptionsMenu = true;

  @observable inputValue;

  @debounce(250)
  inputValueChanged() {
    this.activateSortable = false;
    setTimeout(() => {
      this.convertToHtml();
    }, 0)
  }

  autoFocus = true;
  DRAG_BUTTON_CLASS = DRAG_BUTTON_CLASS;

  result = "";
  insertCodeRef = null;
  draggableName = "";
  sortableContext = "";

  iconArrows = arrows;
  iconPencil = pencil;

  mouseX = 0;
  mouseY = 0;
  showRadialContextMenu = false;
  isEditMode = false;

  constructor(commandCentral) {
    this.commandCentral = commandCentral;
  }

  attached() {
    this.inputValue = this.content;

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
    if (this.codeLang) {
      input = `\`\`\` ${this.codeLang}\n${this.inputValue}\n \`\`\``;
    } else {
      input = this.inputValue;
    }

    this.result = renderMarkdown(input);
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
      line = line || '\n';
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
