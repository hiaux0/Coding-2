import {bindable} from 'aurelia-framework';
import './hio-context-menu.less';

export class HioContextMenu {
  @bindable value;
  @bindable mouseX;
  @bindable mouseY;

  attached() {
    // Demo by http://creative-punch.net

    var items = document.querySelectorAll('.circle div');

    for (var i = 0, l = items.length; i < l; i++) {
      items[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";

      items[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
    }

    setTimeout(() => {
      document.querySelector('.circle').classList.toggle('open');
    }, 0)

    // document.querySelector('.menu-button').onclick = function (e) {
    //   e.preventDefault(); 
    //   document.querySelector('.circle').classList.toggle('open');
    // }
  }
}

