
const groups = {
  id: 1,
  parentId: null,
  children: {
    folders: [
      {
        id: 2,
        parentId: 1,
        children: {
          folders: [
            {id:5, parentId: 2},
            {id:6, parentId: 2}
          ],
          projects: []
        }
      }
    ],
    projects: [
      {id: 3, parentId: 1},
      {id: 4, parentId: 1}
    ],
  }
}

const flatFolders = [
  { folderid: 111, children: [2222, 333, 444], parent: null },
  { folderid: 333, children: null, parent: 111, }
]

const flatProjects = [
  { projectsId: 1 , parent: null },
  { projectsId: 2 , parent: null },
  { projectsId: 3 , parent: null },
  { projectsId: 4 , parent: 333 },
  { projectsId: 5 , parent: 333 },
]

// root stuff

parents = [
  { folderid: 111, children: null, parent: null },
  { folderid: 222, children: null, parent: null },
  { folderid: 333, children: null, parent: null }
]

leaves = [
  { projectsId: 1, parent: null },
  { projectsId: 2, parent: null },
  { projectsId: 3, parent: null }
]

// now expanding folderId 222
// fetch

fetchedParents = [
  { folderid: 444, children: null, parent: 222 },
  { folderid: 555, children: null, parent: 222 }
]

fetchedLeaves = [
  { projectsId: 4, parent: 222 },
  { projectsId: 5, parent: 222 }
]

// update `parents`

parents = [
  { folderid: 111, children: null, parent: null },
  { folderid: 222, children: [444, 555], parent: null },
  { folderid: 333, children: null, parent: null },
  { folderid: 444, children: null, parent: 222 },
  { folderid: 555, children: null, parent: 222 }
]

leaves = [
  { projectsId: 1, parent: null },
  { projectsId: 2, parent: null },
  { projectsId: 3, parent: null },
  { projectsId: 4, parent: 222 },
  { projectsId: 5, parent: 222 }
]


// expand 555

fetchedParents = [
  { folderid: 666, children: null, parent: 444 },
  { folderid: 777, children: null, parent: 444 }
]

fetchedLeaves = [
  { projectsId: 6, parent: 444 },
  { projectsId: 7, parent: 444 }
]

// update `parents`

parents = [
  { folderid: 111, children: null, parent: null },
  { folderid: 222, children: {folders: [444, 555], projects: [4, 5]}, parent: null },
  { folderid: 333, children: null, parent: null },
  { folderid: 444, children: {folders: [666, 777], projects: [6, 7]}, parent: 222 },
  { folderid: 555, children: null, parent: 222 },
  { folderid: 666, children: null, parent: 444 },
  { folderid: 777, children: null, parent: 444 }
]

leaves = [
  { projectsId: 1, parent: null },
  { projectsId: 2, parent: null },
  { projectsId: 3, parent: null },
  { projectsId: 4, parent: 222 },
  { projectsId: 5, parent: 222 },
  { projectsId: 6, parent: 444 },
  { projectsId: 7, parent: 444 }
]

// with path field

parents = [
  { folderid: 111, children: null, path: [null] },
  { folderid: 222, children: { folders: [444, 555], projects: [4, 5] }, path: [null] },
  { folderid: 333, children: null, path: [null] },
  { folderid: 444, children: { folders: [666, 777], projects: [6, 7] }, path: [444, 222] },
  { folderid: 555, children: null, path: [555, 222] },
  { folderid: 666, children: null, path: [666, 444, 222] },
  { folderid: 777, children: null, path: [777, 444, 222] }
]

leaves = [
  { projectsId: 1, path: [null] },
  { projectsId: 2, path: [null] },
  { projectsId: 3, path: [null] },
  { projectsId: 4, path: [4, 222] },
  { projectsId: 5, path: [5, 222] },
  { projectsId: 6, path: [6, 444, 222] },
  { projectsId: 7, path: [7, 444, 222] }
]