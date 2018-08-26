import {bindable, inject, observable} from 'aurelia-framework';
import {CommandCentral} from '../../common/command-central'
import {renderMarkdown} from './markdown-parser-custom';
import {debounce} from 'lodash-decorators';

import './markdown-parser.less';

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
  }

  attached() {
    this.commandCentral.subscribeToCommandEvents({
      marked_convertToHtml: this.convertToHtml,
    })
    this.convertToHtml()
  }

  // @debounce(1000)
  convertToHtml = () => {
    this.result = renderMarkdown(this.inputValue)
    // console.log('​MarkdownParser -> convertToHtml -> this.result', this.result);
    this.activateSortable = true;
  }

}

