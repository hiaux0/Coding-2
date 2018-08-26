import {bindable, inject, observable} from 'aurelia-framework';
import {CommandCentral} from '../../common/command-central'
import {initMonaco, renderMarkdown} from './markdown-parser-custom';
import {debounce} from 'lodash-decorators';

import './markdown-parser.less';

const LINE_NUMBER_CLASS = 'line-number';

@inject(CommandCentral)
export class MarkdownParser {
  @bindable activateSortable = false;

  @observable inputValue = `
\`\`\` js
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
\`\`\`
`;

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
  }

  attached() {
    this.commandCentral.subscribeToCommandEvents({
      marked_convertToHtml: this.convertToHtml,
    })
    this.convertToHtml()
  }

  convertToHtml = () => {
    this.result = renderMarkdown(this.inputValue)
    this.createLineNumbers(this.result);

    this.draggableName = `.${LINE_NUMBER_CLASS}`;
    this.sortableContext = 'code';
    this.activateSortable = true;
  }

  createLineNumbers(result) {
    let filter = result.replace(/<pre><code (.*?)>/g, "")
                       .replace("</code></pre>", "")
    let splittedLine = filter.split(/[\n\r]/g);
    
    splittedLine.forEach((line) => {
      let lineNumberSpan = document.createElement('div');
      lineNumberSpan.classList.add(LINE_NUMBER_CLASS);
      lineNumberSpan.style.whiteSpace = 'pre-wrap';
      lineNumberSpan.innerHTML = line;

      this.insertCodeRef.appendChild(lineNumberSpan)
    })
    console.log('line numbers created')
  }
}
