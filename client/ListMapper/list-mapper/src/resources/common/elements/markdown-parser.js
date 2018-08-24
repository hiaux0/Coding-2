import {inject} from 'aurelia-framework';
import {CommandCentral} from '../../common/command-central'
import {renderMarkdown} from './markdown-parser-custom';

import './markdown-parser.less';

@inject(CommandCentral)
export class MarkdownParser {
  autoFocus = true;
  inputValue = 'H~2~0';

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

  convertToHtml = () => {
    this.result = renderMarkdown(this.inputValue) /*?*/
  }


}

