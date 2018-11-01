let groups = [
  { id: 1, name: 'group1' },
  { id: 2, name: 'group2',
    folders: [
      { id: 3, name: 'folder3', path: [3] },
      { id: 4, name: 'folder4', path: [4] },
      { id: 5, name: 'folder5', path: [5],
        children: {
          folders: [
            { id: 6, name: 'folder5_1', parentId: 5, path: [5, 6] },
            { id: 7, name: 'folder5_2', parentId: 5, path: [5, 7],
              children: {
                folders: [
                  { id: 8,  name: 'folder5_2_1', parentId: 7, path: [5, 7, 8] },
                  { id: 9,  name: 'folder5_2_2', parentId: 7, path: [5, 7, 9] },
                  { id: 10, name: 'folder5_2_3', parentId: 7, path: [5, 7, 10],
                  /* We want to add this here.
                    children: {
                      folders: [
                        { id: 11, name: 'folder5_2_3_1', parentId: 10, path: [5, 7, 10, 11] },
                        { id: 12, name: 'folder5_2_3_2', parentId: 10, path: [5, 7, 10, 12] },
                        { id: 13, name: 'folder5_2_3_3', parentId: 10, path: [5, 7, 10, 13] },
                      ],
                      projects: [{}, {}, {}]
                    }
                  */
                  }
                ],
                projects: [{}, {}, {}]
              }
            }
          ],
          projects: [{}, {}, {}]
        }
      }
    ],
    projects: [{}, {}, {}]
  },
]


function findDirectParent(rootFolders, path) {
  let [headId, ...tailPath] = path;
  let parentFolderIndex = rootFolders.findIndex(rootFolder => rootFolder.id === headId);
  let parentFolder = rootFolders[parentFolderIndex];

  if (parentFolder.children == null) return parentFolder;

  let childrenFolders = parentFolder.children.folders;
  return findDirectParent(childrenFolders, tailPath)
}

let targetGroup = groups.find(group => group.id === 2);
let targetFolder = { id: 13, name: 'folder5_2_3_3', parentId: 10, path: [5, 7, 10, 13] }
let foundPathId = findDirectParent(targetGroup.folders, targetFolder.path, [], "yyeyeyeyeye") /*?*/

groups[1].folders[2].children.folders[1].children.folders[2] /*?*/

function findPath(rootFolders, path, indecesPath) {
  let [headId, ...tailPath] = path;
  let parentFolderIndex = rootFolders.findIndex(rootFolder => rootFolder.id === headId);
  let parentFolder = rootFolders[parentFolderIndex];
  if (parentFolder.children == null) {
    indecesPath.push(parentFolderIndex);
    return indecesPath;
  }

  let childrenFolders = parentFolder.children.folders;
  indecesPath.push(parentFolderIndex);

  return findPath(childrenFolders, tailPath, indecesPath)
}


export default function findProjectBasedOnPath(root, idPath) {
  let [headId, ...tailPath] = idPath;
  let targetProject = root.projects.find(project => project.id === headId);
  if (targetProject) return targetProject;

  let parentFolder = root.folders.find(parentFolder => parentFolder.id === headId);
  return findProjectBasedOnPath(parentFolder.children, tailPath);
}

let path1 = [13];
let path2 = [5, 7, 17];
let path3 = [5, 7, 19];
let path4 = [19, 7, 5];

findProjectBasedOnPath(mockGroups[1], path3) /*?*/


// given a folder id, get nested
// 1. deep clone groups
// 2. create some kind of paths array
// eg. for folder id 5 ->

// #region
// {
//   "5": {}
// }

// if expand a folder, eg. folder with id 7,

// {
//   "5": {
//     "7": {}
//   }
// }

// then folder id 10 is clicked,

// {
//   "5": {
//     "7": {
//       "10": {}
//     }
//   }
// }

// [5, 7, 10] makes more sense here.
// #endregion