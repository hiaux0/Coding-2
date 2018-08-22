import {inject} from 'aurelia-framework';
import interact from 'interactjs';

const DRAG_SHADOW_CLASS = 'drag-shadow';

@inject(Element)
export class EnableDragDropCustomAttribute {

  constructor(element) {
    this.element = element;
    /**
     * Summarizes all options
     */
    this.dd = {
      elementsViewModel:   null,
      isCustomElement:     false,
      isValidDropLocation: false,
    }
  }

  attached() {
    console.log('attach enable drag drop')
    // this.checkCustomElement(this.element);
    this.initDraggable();
    this.initDropZone();
  }

  /**
   * Check if the given element is an aurelia custom element, and prepare variables
   */
  checkCustomElement(element) {
    if (typeof element.au.controller.viewModel !== "object") return;

    this.dd.isCustomElement   = true;
    this.dd.elementsViewModel = element.au.controller.viewModel;

    this._verifyCorrectDragDropSetup(this.dd.elementsViewModel);
  }

      /**
       * In order ot use this custom attribute follow the convention.
       * @param {Aurelia.ViewModel.Object} viewModel
       */
      _verifyCorrectDragDropSetup(viewModel) {
        // list data should be stored in `listData`
        if (typeof viewModel.listData === 'undefined') {
          throw new Error("EDD: Element's `listData` is empty ");
        }
        // console.error("TODO: Implement verifying of drag drop's element viewmodel")
      }

  initDraggable(options) {
    options = options || {};

    return interact('.item-container, .draggable', {
      context: this.element
    }).draggable({
      inertia: options.allowInertia || false,
      autoScroll: true,
      // Restrict to vertical movement of element only
      restrict: {
        restriction: ".simple-list", // Change test, if restriction is changed
        // elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      onstart: this.onDragStart,
      onmove:  this.onDragMove,
      onend:   this.onDragEnd,
    });
  }

      /**
       * Handles logic when drag started:
       * * Save the dragged html element to a class variable.
       *
       * * Note the arrow fnc notation, since we are passing this function to an event listener.
       * @param {Drag.Event.Object} event
       */
      onDragStart = (event) => {
        let draggelContainer = event.target;
        let draggel          = draggelContainer.getElementsByTagName('li')[0];
        let clone            = this._createShadowCopy(draggel, this.element);

        let dragStartLocation = draggelContainer.parentElement;
        dragStartLocation.prepend(clone);

        this._addDraggelStyles(draggel);
      }

          /**
           * Before dragging, save location of draggel origin.
           */
          _saveDraggelOriginInfo = (target) => target.getBoundingClientRect();

          _addDraggelStyles(draggel) { draggel.classList.add('is-draggel'); }

          /**
           * Remove transform dynamic css property (from interactjs).
           * Remove css classes added for drag ui.
           *
           * @param {HTML.Element} draggel
           */
          _removeDraggelStyles(draggel) {
            draggel.style.transform = null;
            draggel.setAttribute('data-y', 0);
            this._removeDraggelCssClasses(draggel)
          }

              _removeDraggelCssClasses(draggel) {
                draggel.classList.remove('is-draggel');
                this._removeDragEnterStyling(draggel);
                this._removeDragLeaveStyling(draggel);
              }

          /**
           * TODO : Consider creating a custom element.
           *    Though, due to dynamic tags, is this even possible?
           *    Maybe just attach the whole element to a custom element and just add a "drag-shadow" class to it.
           * @param {HTML.Element} draggel
           * @param {HTML.Element} draggelContext - The context like the interactjs context.
           */
          _createShadowCopy(draggel, draggelContext) {
            let originalCoords = draggel.getBoundingClientRect();
            let { top, width } = originalCoords;
            let clone = draggel.cloneNode(true) // true : copies descendents as well

            let contextTop = draggelContext.getBoundingClientRect().top;

            clone.classList.add(DRAG_SHADOW_CLASS);
            clone.style.position = "absolute";
            clone.style.top = `${top - contextTop}px`;
            console.log('​Clone: Rel top', top - contextTop);
            console.log('Context Abs top', contextTop);
            clone.style.width = `${width}px`;

            return clone;
          }

      /**
       * This function was given by the interactjs demo
       *
       * @param {Object} event
       */
      onDragMove = (event) => {
        let draggelContainer = event.target;
        let draggel = draggelContainer.getElementsByTagName('li')[0];

        // keep the dragged position in the data-x/data-y attributes
        let x = (parseFloat(draggel.getAttribute('data-x')) || 0) + event.dx;
        let y = (parseFloat(draggel.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        draggel.style.webkitTransform = draggel.style.transform = `translate(${0}px, ${y}px)`;
        //^ `0` only allows vertical movement

        // update the position attributes // 2018-08-05 22:11:24 Can be used for history
        draggel.setAttribute('data-x', x);
        draggel.setAttribute('data-y', y);
      }

      /**
        * Remove the drag shadow on drag end
        */
      onDragEnd = (event) => { // `onDragEnd` could also be named `onDrop`
        let draggelContainer = event.target;
        let draggel = draggelContainer.getElementsByTagName('li')[0];
        let clone = document.getElementsByClassName(DRAG_SHADOW_CLASS)[0];

        this._removeClone(clone);
        this._removeDraggelStyles(draggel);
        if (!this.dd.isValidDropLocation) return; // This guard does not make sense 2018-08-19 22:02:49
      }

          _removeClone(clone) {
            let parent = clone.parentNode;
            parent.removeChild(clone);
          }

  initDropZone() {
    interact('.dropzone').dropzone({
      accept: '.draggel-container, .draggable',
      ondragenter: this.ondDragEnter,
      ondragleave: this.onDragLeave,
      ondrop:      this.onDrop,
    })
  }

      /**
       * span
       *  li  
       *  dropzone
       */
      ondDragEnter = (event) => {
        let draggelContainer = event.relatedTarget;
        let draggelContext = draggelContainer.parentElement;
        let draggel = draggelContainer.getElementsByTagName('li')[0];

        let draggelsDropzone = draggelContainer.getElementsByClassName('dropzone')[0];
        let droppel = event.target;
        if (draggelsDropzone === droppel) return;

        let draggelContainerRect = draggelContainer.getBoundingClientRect();
        let droppelRect = droppel.getBoundingClientRect();
        let dragDirection = droppelRect.y - draggelContainerRect.y;
        
        draggelContext.removeChild(draggelContainer);
        let clone = document.getElementsByClassName(DRAG_SHADOW_CLASS)[0];

        if (dragDirection > 0) { // move down
          this._adjustCloneOnDragDown(clone, droppel)
          this._adjustDraggelOnDragDown(draggel, droppel)
          droppel.insertAdjacentElement('afterEnd', draggelContainer);
        } else { // move up
          this._adjustCloneOnDragUp(clone, droppel)
          // this._adjustDraggelOnDragUp(draggel, droppel)
          droppel.insertAdjacentElement('afterEnd', draggelContainer);
        }


        this.dd.isValidDropLocation = true;
        this._addDragEnterStyling(draggel);
        this._removeDragLeaveStyling(draggel);
      }

          _addDragEnterStyling(draggel)    { draggel.classList.add('drag-entered'); }
          _removeDragLeaveStyling(draggel) { draggel.classList.remove('drag-left'); }

          _adjustCloneOnDragDown(clone, droppel) {
            let adjustmentTop = droppel.parentElement.getBoundingClientRect().height;
            let currentTop = this._removePx(clone.style.top)
            
            let newTop = currentTop + adjustmentTop;
            clone.style.top = `${newTop}px`;
          }

                _adjustCloneOnDragUp(clone, droppel) {
                  let droppelParent = droppel.parentElement;
                  let droppelParentRect = droppelParent.getBoundingClientRect();
                  let droppelParentHeight = droppelParentRect.height;
                  let droppelParentTop = droppelParentRect.top;

                  let contextTop = this.element.getBoundingClientRect().top;

                  let newTop = droppelParentTop + droppelParentHeight - contextTop;
                  clone.style.top = `${newTop}px`;
                }

                _removePx(string) {
                  let result = string.replace("px", "");
                  return Number(result)
                }

          _adjustDraggelOnDragDown(draggel, droppel) {
            let adjustmentHeight = droppel.parentElement.getBoundingClientRect().height;
            let y = draggel.getAttribute('data-y')
            let newTop = Number(y) - adjustmentHeight;

            draggel.style.webkitTransform = draggel.style.transform = `translate(${0}px, ${newTop}px)`;
            draggel.setAttribute('data-y', newTop);
          }

                    _adjustDraggelOnDragUp(draggel, droppel) {
                      let adjustmentTop = droppel.getBoundingClientRect().height;
                      let y = draggel.getAttribute('data-y')
                      console.log('​EnableDragDropCustomAttribute -> _adjustDraggelOnDragUp -> y', y);
                      let newTop = Number(y) + adjustmentTop;

                      // let droppelParent = droppel.parentElement;
                      let draggelRect = draggel.getBoundingClientRect();
                      let draggelHeight = draggelRect.height;

                      let testAdjust = 10 * 1

                      draggel.style.webkitTransform = 
                        draggel.style.transform = `translate(${0}px, ${y}px)`;
                      // draggel.style.webkitTransform = draggel.style.transform = `translate(${0}px, ${0}px)`;
                      draggel.setAttribute('data-y', testAdjust);
                      // draggel.setAttribute('data-y', -newTop);
                    }


      onDragLeave = (event) => {
        let draggelContainer = event.relatedTarget;
        let draggel = draggelContainer.getElementsByTagName('li')[0];
        let dropZone = event.target;

        this._addDragLeaveStyling(draggel);
        this._removeDragEnterStyling(draggel);
        this.dd.isValidDropLocation = false;

        dropZone.classList.remove("hover")
      }

          _addDragLeaveStyling(draggel)    { draggel.classList.add('drag-left') }
          _removeDragEnterStyling(draggel) { draggel.classList.remove('drag-entered') }

      /**
       * Note, that we are wrapping our <li> with <span class="">. So in the code be aware of
       * draggel, being the actual dragged element <li>, and `relatedTarget` is the wrapper.
       * Normally, in interactjs, `relatedTarget` has the actual draggel
       *
       * @param {Object} event
       */
      onDrop = (event) => {
        let draggelContainer = event.relatedTarget;
        let draggel = draggelContainer.getElementsByTagName('li')[0];
        let dropZone = event.target.parentElement;

        if (dropZone === draggelContainer) return;

        this._removeDraggelStyles(draggel);

        let parent = draggelContainer.parentElement;
        parent.removeChild(draggelContainer);
        dropZone.insertAdjacentElement('afterEnd', draggelContainer);
      }
}

