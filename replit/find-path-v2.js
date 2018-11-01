const mockGroups = [
  { id: 1, name: 'group1' },
  {
    id: 2, name: 'group2',
    folders: [
      { id: 3, name: 'folder3', path: [3] },
      { id: 4, name: 'folder4', path: [4] },
      {
        id: 5, name: 'folder5', path: [5],
        children: {
          folders: [
            { id: 6, name: 'folder5_1', parentId: 5, path: [6, 5] },
            {
              id: 7, name: 'folder5_2', parentId: 5, path: [7, 5],
              children: {
                folders: [
                  { id: 8, name: 'folder5_2_1', parentId: 7, path: [8, 7, 5] },
                  { id: 9, name: 'folder5_2_2', parentId: 7, path: [9, 7, 5] },
                  { id: 10, name: 'folder5_2_3', parentId: 7, path: [10, 7, 5] }
                ],
                projects: [{ id: 17, path: [17, 7, 5] }, { id: 18, path: [18, 7, 5] }, { id: 19, path: [19, 7, 5] }]
              }
            }
          ],
          projects: [{ id: 14, path: [14, 5] }, { id: 15, path: [15, 5] }, { id: 16, path: [16, 5] }]
        }
      }
    ],
    projects: [{ id: 11, path: [11] }, { id: 12, path: [12] }, { id: 13, path: [13] }]
  }
];

const testGroup = [
  {
    folders: [
      {
        "title": "Folder 1", "id": "46125", "folder_id": "null",
        "children": {
          folders: [
            { "title": "Folder 1.1", "id": "46128", "folder_id": "46125",
              children: {
                folders: [ { "title": "Folder 1.1.1", "id": "46132", "folder_id": "46128" } ],
                projects: [
                  { "title": "Project 1.1.1", "id": "46130", "folder_id": "46128" },
                  { "title": "Project 1.1.2", "id": "46131", "folder_id": "46128" }
                ],
              }
            }
          ],
          projects: [
            { "title": "Project 1.1", "id": "46126", "folder_id": "46125" },
            { "title": "Project 1.2", "id": "46127", "folder_id": "46125" }
          ]
        }
      },
      { "title": "Folder 2", "id": "46129", "folder_id": "null" }
    ],
    projects: [
      { "title": "Project 1", "id": "46123", "folder_id": "null" },
      { "title": "Project 2", "id": "46124", "folder_id": "null" }
    ]
  }
]

function findFolderBasedOnPath(rootFolders, idPath) {
  console.log('------------------------------')
  console.log('findFolderBasedOnPath -> idPath', idPath);
  console.log('findFolderBasedOnPath -> rootFolders', rootFolders);
  let clonedIdPath = [...idPath];
  let nextId = clonedIdPath.pop();
  console.log('findFolderBasedOnPath -> nextId', nextId);

  let parentFolderIndex = rootFolders.findIndex(rootFolder => Number(rootFolder.id) === nextId);
  let parentFolder = rootFolders[parentFolderIndex];
  console.log('findFolderBasedOnPath -> parentFolder', parentFolder);
  console.log('findFolderBasedOnPath -> parentFolder.children', parentFolder.children);
  // if
  if (parentFolder.children == null) return parentFolder;

  let childrenFolders = parentFolder.children.folders;
  console.log('findFolderBasedOnPath -> childrenFolders', childrenFolders);
  return findFolderBasedOnPath(childrenFolders, clonedIdPath)
}

// let paath = [46125, 46128, 46132]
let paath = [46132, 46128, 46125]
// findFolderBasedOnPath(mockGroups[1].folders, paath); /*?*/
findFolderBasedOnPath(testGroup[0].folders, paath); /*?*/


/**
 * Given a path of ids to a specific `targetFolder`, search the `root` for the
 * `targetFolder` and return it.
 * @param {Array<Folder>} root
 * @param {Array<FolderId>} idPath
 * @returns {Folder} targetFolder
 */
export default function findProjectBasedOnPath(root, idPath) {
  let nextId = idPath.pop();
  let targetProject = root.projects.find(project => project.id === nextId);
  if (targetProject) return targetProject;

  let parentFolder = root.folders.find(parentFolder => parentFolder.id === nextId);
  return findProjectBasedOnPath(parentFolder.children, idPath);
}

let path1 = [13];
let path2 = [5, 7, 17];
let path3 = [5, 7, 19];
let path4 = [19, 7, 5];

// findProjectBasedOnPath(mockGroups[1], path4)

/**
 * @typedef {Object} Folder
 * @prop {FolderId} id
 * @prop {Object} children {folders, projects}
 * ...for other props see api for GET /folders
 */

 /**
 * @typedef {Number} FolderId
 */

