import {bindable} from 'aurelia-framework';
import './flex-box-leveling.less';
import {$} from '../common/html-helpers/html-helpers';

export class FlexBoxLeveling {
  @bindable value;

  constructor() {
    this.isOverlayActive = false;
  }

  valueChanged(newValue, oldValue) {

  }

  activateOverlay() {
    this.isOverlayActive = !this.isOverlayActive;
  }
}

