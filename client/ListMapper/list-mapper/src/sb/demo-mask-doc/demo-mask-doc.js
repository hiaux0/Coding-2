import {bindable} from 'aurelia-framework';
import { code } from '../../resources/common/styles/icons';
import './demo-mask-doc.less'

export class DemoMaskDoc {
  @bindable value = 'DemoMaskDoc';

  codeIcon = code;
  showCode = false;
  showMoreOptionsMenu = false;

  toggleCodeMode() {
    this.showCode = !this.showCode;
  }
}
