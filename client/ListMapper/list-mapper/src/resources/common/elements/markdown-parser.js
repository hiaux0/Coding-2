import {bindable, inject, observable} from 'aurelia-framework';
import {CommandCentral} from '../../common/command-central'
import {renderMarkdown} from './markdown-parser-custom';
import {debounce} from 'lodash-decorators';

import './markdown-parser.less';

@inject(CommandCentral)
export class MarkdownParser {
  @bindable activateSortable = false;

  @observable inputValue = '- asdasd\n- asdad\n- 23isdjasd\n';

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

