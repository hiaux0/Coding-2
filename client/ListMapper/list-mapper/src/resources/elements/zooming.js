import { bindable } from 'aurelia-framework';
import { throttle } from 'lodash-decorators';
import './zooming.less'

export class Zooming {
  @bindable value = "Hello world";

  currentZoomValue = 1;

  constructor() {
    window.zooming = this;
  }

  zoomConfig = {
    context: ".zoom-container",
    zoom: {
      velocity: 0.05
    }
  }

  @throttle(10)
  zoom(event) {
    if (event.deltaY > 0) {
      this.setZoom(-1);

    } else {
      this.setZoom(1);
    }
  }

  /**
   * Set zoom for given context.
   * @param {Number} zoomDirection
   * @value [1,-1] `1` for 'zoom in' and `-1` for 'zoom out'
   */
  setZoom(zoomDirection) {
    let context = this.zoomConfig.context;
    let contextElement = document.querySelector(context);
    let computedZoomValue = getComputedStyle(contextElement).transform;
    let zoomValue = (computedZoomValue === 'matrix(1, 0, 0, 1, 1, 1)') ? 1 : this.currentZoomValue;
    let velocity = this.zoomConfig.zoom.velocity;

    let zoomLevel = velocity * zoomDirection + zoomValue;
    let scale = zoomLevel;
    let translate = zoomLevel;
    let newZoom = `matrix(${scale}, 0, 0, ${scale}, ${translate}, ${translate})`;
    contextElement.style.transform = newZoom;

    this.currentZoomValue = zoomLevel;
  }

}
