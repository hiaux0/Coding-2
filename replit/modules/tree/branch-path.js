const _ = require('lodash');

/**
 * @typedef {string<number>} Id
 */

/**
 * @typedef {Object<Id, Array<Id>>} BranchPathMap
 */

/**
 * @example
  [
    { name: 'f-root-1', id: '1', parentId: null },
    { name: 'f-root-2', id: '7', parentId: null },
    { name: 'f-nested-2-1', id: '10', parentId: '7' },
    { name: 'f-nested-2-1-1', id: '11', parentId: '10' }
  ]
  ->
  {
    '1' => [null],
    '7' => [null],
    '10' => [null, '7'],
    '11' => [null, '10', '7']
  }
 * @param {Object} param
 * @property {Array<Object>} tree
 * @property {string = 'id'} idKey
 * @property {Id} rootId
 * @property {string = 'parentId'} parentIdKey
 * @property {BranchPathMap} [branchPathMap] - if given, fill out existing path map.
 * @returns {BranchPathMap} branchPathMap
 */
function buildBranchPath({
  tree,
  idKey = 'id',
  rootId = null,
  parentIdKey = 'parentId',
  branchPathMap = {}
}) {
  tree.forEach(branch => {
    let initBranchPath = [branch[parentIdKey]];
    branchPathMap[branch.id] = initBranchPath;
  });

  for (let i = 0; i < tree.length; i++) {
    if (completePathRetrieved(branchPathMap, rootId)) break;
    tree.forEach(branch => {
      let branchPath = branchPathMap[branch[idKey]]
      let latestParentId = branchPath[branchPath.length - 1];

      if (latestParentId !== rootId) {
        let parentsPath = [...branchPathMap[latestParentId]];
        parentsPath.push(latestParentId);
        branchPathMap[branch[idKey]] = parentsPath;
      }
    });
  }

  return branchPathMap;
}

/**
 * @param {BranchPathMap} branchPathMap
 * @param {Id} rootId
 * @return {boolean} - full path retrieved, when path includes the `rootId`
 */
function completePathRetrieved (branchPathMap, rootId) {
  let paths = Object.values(branchPathMap);
  return paths.every(path => path.includes(rootId));
}

/**
 * Retrieve the direct sibling ids of a node.
 * @param {string} nodeId
 * @param {BranchPathMap} branchPathMap
 * @returns {Array<Id>}
 */
function getSiblingIds(nodeId, branchPathMap) {
  let nodePath = branchPathMap[nodeId];
  if (!nodePath) return;

  let directParentIndex = nodePath.length - 1;
  let directParentId = nodePath[directParentIndex];

  let filteredSiblings = [];
  for (let id in branchPathMap) {
    if ((branchPathMap[id].length === nodePath.length) // is at same level as node
        && (branchPathMap[id][directParentIndex] === directParentId) // is direct sibling
        && id !== nodeId) {  // is node itself
      filteredSiblings.push(id);
    }
  }

  return filteredSiblings;
}

/**
 * Retrieve the direct children ids of a node.
 * @param {string} nodeId
 * @param {BranchPathMap} branchPathMap
 * @returns {Array<Id>}
 */
function getDirectChildrenIds(nodeId, branchPathMap) {
  const nodePath = branchPathMap[nodeId];
  const positionInPath = nodePath.length;

  const directChildrenIds = [];
  for (let id in branchPathMap) {
    const path = branchPathMap[id];
    if (path.length !== positionInPath + 1) continue; // not direct child
    if (path[positionInPath] === nodeId) {
      directChildrenIds.push(id)
    }
  }
  return directChildrenIds;
}

/**
 * Check whether direct children are checked.
 * @param {string} nodeId
 * @param {Array<Id>} checkedNodes
 * @param {BranchPathMap} branchPathMap
 * @returns {boolean}
 */
function allChildrenAreChecked(nodeId, checkedNodes, branchPathMap) {
  const nodePath = branchPathMap[nodeId];
  if (!nodePath) return;

  const nodeChildrenIds = getDirectChildrenIds(nodeId, branchPathMap);
  const checkedChildren = _.intersection(checkedNodes, nodeChildrenIds);
  return checkedChildren.length === nodeChildrenIds.length;
}

module.exports = {
  buildBranchPath,
  completePathRetrieved,
  getSiblingIds,
  getDirectChildrenIds,
  allChildrenAreChecked
}


let test = [
  { name: "f-root-1", id: "1", parentId: null },
  { name: "f-nested-1-1", id: "2", parentId: "1" },
  { name: "f-nested-1-1-1", id: "3", parentId: "2" },
  { name: "f-nested-1-1-2", id: "4", parentId: "2" },
  { name: "f-nested-1-1", id: "5", parentId: "1" },
  { name: "f-root-2", id: "6", parentId: null },
  { name: "p-nested-1-1", id: "8", parentId: "1" },
  { name: "p-nested-1-1-1", id: "9", parentId: "2" },
  { name: "p-nested-1-1-2", id: "10", parentId: "2" },
  { name: "p-nested-1-2", id: "11", parentId: "1" },
  { name: "p-nested-2-1", id: "14", parentId: "6" },
  { name: "p-nested-2-2", id: "15", parentId: "10" },
  { name: "p-root-1", id: "7", parentId: null },
  { name: "p-root-2", id: "12", parentId: null },
  { name: "p-root-3", id: "13", parentId: null }
]

buildBranchPath({
  tree: test,
  idKey: 'id',
  rootId: null,
  parentIdKey: 'parentId'
}) /*?*/