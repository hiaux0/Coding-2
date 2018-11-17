import {bindable} from 'aurelia-framework';
import { code } from '../../resources/common/styles/icons';
import './demo-mask.less'

export class DemoMask {
  /**
   * @type {String} codeLang ['js', 'css', 'xml']
   */
  @bindable codeLang = 'xml'

  /**
   * @type {String} codeConent of what you want to display
   */
  @bindable codeContent = 'Your code goes here.'

  codeIcon = code;
  showCode = false;
  showMoreOptionsMenu = false;

  toggleCodeMode() {
    this.showCode = !this.showCode;
  }
}
