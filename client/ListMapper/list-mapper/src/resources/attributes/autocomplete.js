import {bindable, inject} from 'aurelia-framework';
import {debounce} from 'lodash-decorators';

@inject(Element)
export class AutocompleteCustomAttribute {
  @bindable list;
  @bindable value;
  @bindable suggestedList;
  @bindable key;

  /**
   * As we allow different types in a `list`, this variable provides the key for the actual content in an Object.
   */
  @bindable key;
  /**
   * The complete list you want to search in, accepts: ["", "",...], [Object, Object,...]
   * @param {Array} list.
   */
  @bindable list;
  /**
   * After filtration, the remaining results.
   */
  @bindable suggestList;
  /**
   * The current value/symbol in the input field.
   */
  @bindable value;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.preparedList = this.prepareList();
  }
  
  @debounce(66)
  valueChanged(newValue, oldValue) {
    this.suggestedList = this.filterByUserInput(newValue);
  }

  suggestedListChanged(newValue) {
  }

  filterByUserInput(value) {
    let fileredList = this.preparedList.filter((listItem) => {
      return listItem.name.includes(this.value)
    });
    return fileredList;
  }

  /**
   * Allow the list, which should be autocomplete, to be as flexibel as possible.
   */
  prepareList() {
    return this.list.map((listItem) => ({
      name: listItem[this.key],
      id: listItem.id,
    }));
  }  


}

