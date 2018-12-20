/**
 * @typedef {string<number>} Id
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
 *
 * @param {Object} param
 * @property {Array<Object>} tree
 * @property {string = 'id'} idKey
 * @property {Id} rootId
 * @property {string = 'parentId'} parentIdKey
 * @property {Object<Id, Array<Id>>} [branchPathMap] - fill out existing path map.
 * @returns {Object<Id, Array<Id>>} branchPathMap
 */
function buildBranchPath({
  tree,
  idKey='id',
  rootId=null,
  parentIdKey='parentId',
  branchPathMap={}
}) {
  tree.forEach(branch => {
    let initBranchPath = [branch[parentIdKey]];
    branchPathMap[branch.id] = initBranchPath;
  });

  while (!completePathRetrieved(branchPathMap, rootId)) {
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
 * @param {Object<Id, Array<Id>>} branchPathMap
 * @param {Id} rootId
 * @return {boolean} - full path retrieved, when path includes the `rootId`
 */
function completePathRetrieved (branchPathMap, rootId) {
  let paths = Object.values(branchPathMap);
  return paths.every(path => path.includes(rootId));
}

module.exports = {
  buildBranchPath,
  completePathRetrieved
}


// const state = {
//   selectedGroup: {
//     folders: allFolders,
//     projects: allProjects
//   },
//   workflow: {
//     project_ids: ['8', '9', '10', '11']
//   },
//   projectSelector: {
//     alreadyCheckedFolders: { '1': true },
//     checkedFolders: ['1']
//   }
// }