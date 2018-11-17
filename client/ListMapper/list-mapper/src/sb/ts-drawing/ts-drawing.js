import {bindable} from 'aurelia-framework';
import './ts-drawing.less'

export class TsDrawing {
  @bindable value = 'TsDrawing';

  canDraw = false;
  canvas = undefined;
  prevX = undefined;
  prevY = undefined;

  bind() {
    this.ctx = this.canvas.getContext('2d');
  }

  draw(ev) {
    if (!this.canDraw) return;
    let x = ev.layerX;
    let y = ev.layerY;
    let radius = 10;

    // this.ctx.moveTo(x, y)
    // this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);

    // this.ctx.moveTo(0, 0);
    // this.ctx.lineTo(200, 100);
    // this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.save();


    this.prevX = ev.layerX;
    this.prevY = ev.layerY;
  }

  /**
   * https://codepen.io/abidibo/pen/rmGBc
   * https://www.codicode.com/art/undo_and_redo_to_the_html5_canvas.aspx
   */
  undoDraw() {
    console.log("​TsDrawing -> undoDraw -> undoDraw")

    this.ctx.restore()
  }

  activateDraw(ev) {
    this.canDraw = true;
    this.prevX = ev.layerX;
    this.prevY = ev.layerY;
  }

  deactivateDraw() {
    this.canDraw = false;
    console.log('not ok')
  }
}
