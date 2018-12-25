let obj1 = {
  baseKey: {
    nested11: {
      nested21: {}
    },
    nested12: {}
  }
}

/**
 * Add id keys and values to an obj.
 * @param {obj} obj
 */
function addIdToObject(obj) {
  let stringified = JSON.stringify(obj)
  let id = 1;

  // Using inline function here due to incremental id
  let withIdAdded = stringified.replace(/(":{}?)/g, (match) => {
    let replaceString = `":{"id":"${id++}"`;
    let ending = (match === '":{') ? ',' : '}';
    return replaceString + ending;
  })
  return JSON.parse(withIdAdded);
}


let withId = addIdToObject(obj1);
let baseKey = 'baseKey';

let resultMap = new Map();
function flattenAndAddParentId(object, resultMap) {
  if (object === undefined) return resultMap; /*?*/

  for (let key in object) {
    if (key === baseKey) object[key].parentId = null;

    if (key !== 'id' && key !== 'parentId') {
      object[key].parentId = object.id;
      resultMap.set(key, object[key]);

      flattenAndAddParentId(object[key], resultMap);
    }
  }
}

flattenAndAddParentId(withId, resultMap); /*?*/
console.log("​resultMap", resultMap)

