import {bindable} from 'aurelia-framework';
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
}
