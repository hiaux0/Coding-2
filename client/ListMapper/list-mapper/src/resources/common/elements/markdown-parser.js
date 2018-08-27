import {bindable, inject, observable} from 'aurelia-framework';
import {CommandCentral} from '../../common/command-central'
import {initMonaco, renderMarkdown} from './markdown-parser-custom';
import {debounce} from 'lodash-decorators';

import './markdown-parser.less';

const LINE_NUMBER_CLASS = 'line-number';
const HIGHLIGHT_CODE_LINE_CLASS = 'highlight-code-line-class';

@inject(CommandCentral)
export class MarkdownParser {
  @bindable activateSortable = false;

  @observable inputValue = `\`\`\` js
function addClassToListTag(tokens, idx, options, env, renderer) {
  // console.log('​functionhello_world -> tokens', tokens);
  let flatTokens = tokens.tokens; /*?*/
  // console.log('​addClassToListTag -> flatTokens', flatTokens);
  flatTokens.forEach((token) => {
    if (token.type === 'bullet_list_open') {
      // token.attrPush(['sortable', ''])
    }
  })
  // return renderedHTML;
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
    this.result = "";
    this.insertCodeRef = null;
    this.draggableName = "";
    this.sortableContext = "";

    this.mouseX = 0;
    this.mouseY = 0;
    this.showContextMenu = false;

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
    this.result = renderMarkdown(this.inputValue)
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
                       .replace("</code></pre>", "")
    let splittedLine = filter.split(/[\n\r]/g);
    
    splittedLine.forEach((line) => {
      resultArr.push(line);
    })
    return resultArr;
  }

  highlightLine(event) {
    console.log('​MarkdownParser -> highlightLine -> highlightLine');
    this.mouseX = event.x;
    this.mouseY = event.y;
    this.showContextMenu = true;

    let lineNumberDiv = this.correctHighlightElement(event.target, LINE_NUMBER_CLASS)
    if (lineNumberDiv) {
      lineNumberDiv.classList.toggle(HIGHLIGHT_CODE_LINE_CLASS)
    }
    event.stopPropagation();
  }

  /**
   * Check if the (double) click target has specific class.
   * TODO_LATER: The logic can certainly be prettier --> do while loop
   * @param {HTMLElement} target 
   */
  correctHighlightElement(target, className) {
    if (target.classList.contains(className)) {
      return target;
    } else if (target.parentElement.classList.contains(className)) {
      return target.parentElement;
    } else if (target.parentElement.parentElement.classList.contains(className)) {
      return target.parentElement.parentElement;
    }
    return false;
  }
}
