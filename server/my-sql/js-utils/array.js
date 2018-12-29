const isEqual = require('lodash/isEqual')
    , isArray = require('lodash/isArray')
    , cloneDeep = require('lodash/cloneDeep')
      ;

/**
 * Check if 2 arrays are equal regardless of the order of their element.
 * 
 * @param {Array} arr1 
 * @param {Array} arr2 
 */
exports.isEqualNoOrder = (arr1, arr2) => {
  if (!isArray(arr1)) 
    throw new Error(`First arg expected: 'Array', is: ${typeof arr2}`);
  if (!isArray(arr2)) 
    throw new Error(`Second arg expected: 'Array', is: ${typeof arr2}`);
  if (isEqual(arr1, arr2)) 
    return true;

  let arr1Copy = cloneDeep(arr1).sort();
  let arr2Copy = cloneDeep(arr2).sort();

  return isEqual(arr1Copy, arr2Copy);
}

