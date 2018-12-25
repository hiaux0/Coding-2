// Think about how best the api fits in here, because building the dep tree is expensive
// when a path is given, cache it (save to db) and only update when update signal is given

// Replace with actual dep tree, ie from the library.

/**
 * @type {FileWithImportsRaw}
 */
const appJsDepTree = require('../configs/list-mapper-app-js.json');
const serverConfig = require('../configs/server-config.json');

const basePath = serverConfig.depTree.basePath;

/**
 * @typedef {Object} FileWithImportsRaw
 * @prop {string} <imported-file-name>
 */

/**
 * @typedef {Object} FileWithImportsEnhanced
 * @property {number} id
 * @property {number} parentId
 * @property {string} <imported-file-name> (repeat)
 */

/**
 * @typedef {Array['<file-name>', FileWithImportsEnhanced]} DepTreeAsArray
 */

/**
 * Enhance the raw dep tree from lib.
 * @returns {DepTreeAsArray}
 */
function getDepTree() {
  let withoutBasePath = removeBasePath(appJsDepTree, basePath);
  let withId = addIdToObject(withoutBasePath);

  let resultMap = new Map();
  flattenAndAddParentId(withId, resultMap);

  return Array.from(resultMap);
}

/**
 * Reduce path string
 * @param {FileWithImportsRaw} obj
 * @param {string} basePath - for, eg. '/base/path/to/file', `basePath` would be '/base/path'
 * @returns {Object} withoutBasePath
 */
function removeBasePath(obj, basePath) {
  let stringified = JSON.stringify(obj)
  let reg = new RegExp(basePath, "g");
  let withoutBasePath = stringified.replace(reg, '');
  return JSON.parse(withoutBasePath);
}

/**
 * Add id keys and values to an obj.
 * @param {Object} obj
 * @returns {Object} withIdAdded
 */
function addIdToObject(obj) {
  let stringified = JSON.stringify(obj)
  let id = 1;

  // Using inline function (instead of separate id) here due to incremental id
  let withIdAdded = stringified.replace(/(":{}?)/g, (match) => {
    let replaceString = `":{"_id":"${id++}"`;
    let ending = (match === '":{') ? ',' : '}';
    return replaceString + ending;
  })
  return JSON.parse(withIdAdded);
}

/**
 * @param {Object} object
 * @param {Map} resultMap - empty map that the result gets saved in
 * @void (because I didn't figured out how to return a result in recursion --> promise?)
 */
function flattenAndAddParentId(object, resultMap) {
  if (object === undefined) return resultMap; /*?*/

  for (let key in object) {
    if (key === basePath) object[key].parentId = null;

    if (key !== '_id' && key !== '_parentId') {
      object[key]._parentId = object.id;
      resultMap.set(key, object[key]);

      flattenAndAddParentId(object[key], resultMap);
    }
  }
}

module.exports = {
  getDepTree
}
