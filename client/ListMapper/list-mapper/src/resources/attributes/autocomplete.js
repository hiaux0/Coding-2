import {bindable, inject} from 'aurelia-framework';
import {debounce} from 'lodash-decorators';

@inject(Element)
export class AutocompleteCustomAttribute {
  @bindable list;
  @bindable value;
  @bindable suggestedList;
  @bindable key;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.preparedList = this.prepareList();
    console.log('​AutocompleteCustomAttribute -> constructor -> this.preparedList', this.preparedList);
  }
  
  @debounce(66)
  valueChanged(newValue, oldValue) {
    this.suggestedList = this.filter(newValue);
  }

  suggestedListChanged(newValue) {
    // console.log('​AutocompleteCustomAttribute -> suggestedListChanged -> newValue', newValue);
  }

  filter(value) {
    let fileredList = this.preparedList.filter((listItem) => {
      return listItem.includes(this.value)
    });
    return fileredList;
  }

  /**
   * Allow the list, which should be autocomplete, to be as flexibel as possible.
   */
  prepareList() {
    return this.list.map((listItem) => listItem[this.key]);
  }  


}

