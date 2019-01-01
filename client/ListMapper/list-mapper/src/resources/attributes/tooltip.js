import {bindable, inject} from 'aurelia-framework';
import '../common/styles/tooltip.less';

@inject(Element)
export class TooltipCustomAttribute {
  @bindable({ primaryProperty: true }) text;
  @bindable onAppear;

  tooltip;

  /**
   * @type {boolean}
   */
  firstHover = true;

  constructor(element) {
    this.element = element;
  }

  attached() {
    // const allowed = ['더해줄', '생기고', '아이가'];
    // if (!allowed.includes(this.element.innerText.trim())) return;

    const parent = this.element.parentNode;
    const textContent = this.element.textContent.trim();
    this.tooltip = this.createTooltipElement(textContent);
    parent.insertBefore(this.tooltip, this.element.nextSibling);
    this.addTooltipEvents(this.element);
  }

  detached() {
    this.removeTooltipEvents(this.element);
    this.element.parentNode.removeChild(this.tooltip);
  }

  addTooltipEvents(element) {
    element.addEventListener('mouseover', this.showTooltip);
    element.addEventListener('mouseout', this.hideTooltip);
  }

  removeTooltipEvents(element) {
    element.removeEventListener('mouseover', this.showTooltip);
    element.removeEventListener('mouseout', this.hideTooltip);
  }

  /**
   * On first hover, update text if appear callback is given
   * Shows and positions the tooltip.
   */
  showTooltip = () => {
    if (document.getSelection().toString() !== '') return;

    if (this.firstHover && this.onAppear) {
      const contextText = this.element.textContent.trim();
      this.onAppear(contextText).then(res => {
        const { translation } = res;

        this.tooltip.innerText = translation;
        this.firstHover = false;
      });
    }

    this.tooltip.style.display = 'block'
    this.tooltip.style.opacity = 1;
    const {left} = this.setTooltipPosition(this.element);
    this.tooltip.style.left = `${left}px`;
  }

  hideTooltip = () => {
    this.tooltip.style.opacity = 0;
    this.tooltip.style.display = 'none'
  }

  createTooltipElement(textContent) {
    const tooltip = document.createElement('span');
    tooltip.classList.add('tooltip');
    tooltip.innerText = this.text || textContent;

    return tooltip;
  }

  setTooltipPosition(element) {
    const rect = element.getBoundingClientRect();
    const xPos = rect.x + rect.width / 2 - 25;

    return {
      left: xPos
    }
  }

}

