import { bindable, inject } from 'aurelia-framework';

@inject(Element)
export class ZoomingCaCustomAttribute {
  /**
   * @param {String=".zoom-container"} context the element which should be zoomed
   */
  @bindable context = '.zoom-container';
  /**
   * @param {Number=0.05} velocity constrols velocity of zoom scrolling
   */
  @bindable velocity = 0.05;

  currentZoomValue = 1;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.contextElement = document.querySelector(this.context);
    window.addEventListener('wheel', this.zoom);
  }

  detached() {
    window.removeEventListener('wheel', this.zoom);
  }

  /**
   * Event callback which handles zooming.
   * Arrow function due to usage of class method.
   * @param {Object} event added by `addEventListener`
   */
  zoom = (event) => {
    event.preventDefault();
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
    let computedZoomValue = getComputedStyle(this.contextElement).transform;
    let zoomValue = (computedZoomValue === 'matrix(1, 0, 0, 1, 1, 1)') ? 1 : this.currentZoomValue;

    let zoomLevel = this.velocity * zoomDirection + zoomValue;
    let scale = zoomLevel;
    let translate = zoomLevel;
    let newZoom = `matrix(${scale}, 0, 0, ${scale}, ${translate}, ${translate})`;
    this.contextElement.style.transform = newZoom;

    this.currentZoomValue = zoomLevel;
  }
}

