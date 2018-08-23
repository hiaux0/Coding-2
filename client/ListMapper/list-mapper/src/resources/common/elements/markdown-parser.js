import {inject} from 'aurelia-framework';
import {CommandCentral} from '../../common/command-central'
import Marked from 'marked';
import './markdown-parser.less';

@inject(CommandCentral)
export class MarkdownParser {
  autoFocus = true;
  inputValue = "";

  constructor(commandCentral) {
    this.commandCentral = commandCentral;
  }

  attached() {
    this.commandCentral.subscribeToCommandEvents({
      marked_convertToHtml: this.convertToHtml,
    })
  }

  convertToHtml = () => {
    let result = Marked(this.inputValue);
    console.log(result);
  }

}

