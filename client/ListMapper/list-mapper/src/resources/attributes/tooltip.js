import {bindable, inject} from 'aurelia-framework';
import '../common/styles/tooltip.less';

@inject(Element)
export class TooltipCustomAttribute {
  @bindable({ primaryProperty: true }) text;

  tooltip;

  constructor(element) {
    this.element = element;
  }

  attached() {
    // const allowed = ['더해줄', '생기고', '아이가'];
    // if (!allowed.includes(this.element.innerText.trim())) return;

    const parent = this.element.parentNode;
		// console.log("​TooltipCustomAttribute -> attached -> parent", parent)
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

  showTooltip = () => {
    this.tooltip.style.opacity = 1;
    const {left} = this.setTooltipPosition(this.element);
    this.tooltip.style.left = `${left}px`;
  }

  hideTooltip = () => {
    this.tooltip.style.opacity = 0;
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

