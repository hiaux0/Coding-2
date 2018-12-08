// Think about how best the api fits in here, because building the dep tree is expensive
// when a path is given, cache it (save to db) and only update when update signal is given

// Replace with actual dep tree
const appJsDepTree = require('../list-mapper-app-js.json');
const serverConfig = require('../configs/server-config.json');

const basePath = serverConfig.depTree.basePath;

// getDepTree() /*?*/

function getDepTree() {
  let withoutBasePath = removeBasePath(appJsDepTree, basePath); /*?*/
  let withId = addIdToObject(withoutBasePath);

  let resultMap = new Map();
  flattenAndAddParentId(withId, resultMap);
	console.log("​getDepTree -> resultMap", resultMap)

  return Array.from(resultMap);
}

function removeBasePath(obj, basePath) {
  let stringified = JSON.stringify(obj)
  let reg = new RegExp(basePath, "g");
  let withoutBasePath = stringified.replace(reg, '');
  return JSON.parse(withoutBasePath);
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

function flattenAndAddParentId(object, resultMap) {
  if (object === undefined) return resultMap; /*?*/

  for (let key in object) {
    if (key === basePath) object[key].parentId = null;

    if (key !== 'id' && key !== 'parentId') {
      object[key].parentId = object.id;
      resultMap.set(key, object[key]);

      flattenAndAddParentId(object[key], resultMap);
    }
  }
}

module.exports = {
  getDepTree
}
