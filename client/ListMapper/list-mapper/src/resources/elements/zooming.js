import { bindable } from 'aurelia-framework';
import './zooming.less'
// import {debounce} from 'lodash-decorators';
import {throttle} from 'lodash-decorators';
import {range} from 'lodash';

// function* getZoomInValues(current) {
//   let zoomInRange = range(current, 100, 0.01);
//   yield* zoomInRange;
// }

// function* getZoomOutValues(current) {
//   console.log('TCL: function*getZoomOutValues -> current', current);
//   let zoomOutRange = range(0, current, 0.01).reverse();
//   console.log('TCL: function*getZoomOutValues -> zoomOutRange', zoomOutRange);
//   yield* zoomOutRange;
// }

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

  // @debounce(66)
  @throttle(10)
  zoom(event) {
    if (event.deltaY > 0) {
      this.zoomOut();
    } else {
      this.zoomIn();
    }
  }

  zoomOut() {
    let context = this.zoomConfig.context;
    let contextElement = document.querySelectorAll(context)[0];
    let computedZoomValue = getComputedStyle(contextElement).transform;
    let zoomValue = (computedZoomValue === 'matrix(1, 0, 0, 1, 1, 1)') ? 1 : this.currentZoomValue;

    this.currentZoomValue = zoomValue;

    let zoomLevel = this.currentZoomValue - this.zoomConfig.zoom.velocity;
    let scale = zoomLevel;
    let translate = zoomLevel;
    let newZoom = `matrix(${scale}, 0, 0, ${scale}, ${translate}, ${translate})`;
    contextElement.style.transform = newZoom;

    this.currentZoomValue = zoomLevel;
  }

  zoomIn() {
    let context = this.zoomConfig.context;
    let contextElement = document.querySelector(context);
    let computedZoomValue = getComputedStyle(contextElement).transform;
    let zoomValue = (computedZoomValue === 'matrix(1, 0, 0, 1, 1, 1)') ? 1 : this.currentZoomValue;

    this.currentZoomValue = zoomValue;

    let zoomLevel = this.currentZoomValue + this.zoomConfig.zoom.velocity;
    let scale = zoomLevel;
    let translate = zoomLevel;
    let newZoom = `matrix(${scale}, 0, 0, ${scale}, ${translate}, ${translate})`;
    contextElement.style.transform = newZoom;

    this.currentZoomValue = zoomLevel;
  }

  zoomDebug(value) {
    let context = this.zoomConfig.context;
    let contextElement = document.querySelectorAll(context)[0];
    let newZoom = `matrix(${value}, 0, 0, ${value}, ${value}, ${value})`;
    contextElement.style.transform = newZoom;
  }

}
