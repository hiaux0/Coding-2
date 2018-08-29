import {bindable, inject} from 'aurelia-framework';
import close from '../html-helpers/close-on-outside-click';
import './radial-context-menu.less';

@inject(Element)
export class RadialContextMenu {
  @bindable value;
  @bindable mouseX;
  @bindable mouseY;

  constructor(element) {
    this.element = element;

    this.circleRef = null;
    this.onOutsideClick = null;
  }

  attached() {
    this.onOutsideClick = close(this.circleRef, () => {
      console.log('Close now');
    })
    window.addEventListener('click', this.onOutsideClick)
    
    // Demo by http://creative-punch.net

    var items = document.querySelectorAll('.circle div');

    for (var i = 0, l = items.length; i < l; i++) {
      items[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";

      items[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
    }

    setTimeout(() => {
      document.querySelector('.circle').classList.toggle('open');
    }, 0)
  }


}

