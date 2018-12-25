
/**
 * Union by key.
 *
 * @example
 * fromArray = [ { a: 1 }, { a: 3 } ];
 * toArray = [ { a: 1 }, { a: 2 } ];
 * key = 'a';
 * expectedArray = [ { a: 1 }, { a: 2 }, { a: 3} ];
 *
 * @param {Object} args
 * @prop {Array<Object>} fromArray
 * @prop {Array<Object>} toArray
 * @prop {string} key
 * @returns {Array<Object>}
 */
const addUniqueByKey = ({fromArray, toArray, key}) => {
  let toArrayOnlyWithKeys = toArray.map(ele => ele[key]);

  let resultArray = fromArray.reduce((acc, element) => {
    if (toArrayOnlyWithKeys.includes(element[key])) return acc;
    return [...acc, element];
  }, toArray);

  return resultArray;
}

module.exports = {
  addUniqueByKey
}