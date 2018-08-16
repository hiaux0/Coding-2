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
   * @param {String}
   */
  @bindable key;
  /**
   * The complete list you want to search in, accepts: ["", "",...], [Object, Object,...]
   * @param {Array}
   */
  @bindable list;
  /**
   * After filtration, the remaining results.
   * @param {Array}
   */
  @bindable suggestList;
  /**
   * The current value/symbol in the input field.
   * @param {String}
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
      return listItem.name.includes(value)
    });
    return fileredList;
  }

  /**
   * Allow the list, which should be autocomplete, to be as flexibel as possible.
   */
  prepareList() {
    if (!this.list[0][this.key]) throw new Error('Key not present');
    
    let key = this.key || ""
    if (!typeof this.list[0] !== 'object')

    return this.list.map((listItem) => ({
      name: listItem[key],
      id: listItem.id,
    }));
  }  


}

