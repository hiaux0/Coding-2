import {bindable} from 'aurelia-framework';
import './showcase-zooming.less'

export class ShowcaseZooming {
  @bindable value = 'ShowcaseZooming';

  example1 = `
    <span
      class="hio-border zoom-ex-1"
      enable-zooming="context: .zoom-ex-1"
    >Zoom me</span>
  `

  example2 = `
    <div
      class="hio-border zoom-ex-2"
      enable-zooming="context: .zoom-ex-2"
    >
      <div class="hio-cards-container">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        Zoom me
      </div>
    </div>
  `

  example3 = `
    <div class="hio-border zoom-ex-3" >
      <div class="hio-cards-container">
        <div class="div-1" enable-zooming="context: .div-1">Zoom me 1</div>
        <div class="div-2" enable-zooming="context: .div-2">Zoom me 2</div>
        <div class="div-3" enable-zooming="context: .div-3">Zoom me 3</div>
      </div>
    </div>
  `
}
