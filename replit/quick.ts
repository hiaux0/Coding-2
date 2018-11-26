
const foldersMock = [
  { title: 'f-root-1', id: '1', parentId: null },
  { title: 'f-nested-1-1', id: '2', parentId: '1' },
  { title: 'f-nested-1-1-1', id: '3', parentId: '2' },
  { title: 'f-nested-1-1-2', id: '4', parentId: '2' },
  { title: 'f-nested-1-1', id: '5', parentId: '1' },
  { title: 'f-root-2', id: '6', parentId: null }
];

const projectsMock = [
  { title: 'p-root-1', id: '7', parentId: null },
  { title: 'p-nested-1-1', id: '8', parentId: '1' },
  { title: 'p-nested-1-1-1', id: '9', parentId: '2' },
  { title: 'p-nested-1-1-2', id: '10', parentId: '2' },
  { title: 'p-nested-1-2', id: '11', parentId: '1' },
  { title: 'p-root-2', id: '12', parentId: '6' },
  { title: 'p-root-3', id: '13', parentId: null }
];


const noChildren = (filterId) => {
  let isParentOfParent = foldersMock.some(folder => folder.parentId === filterId)
  let isParentOfProjects = projectsMock.some(project => project.parentId === filterId)
  return !isParentOfParent && !isParentOfProjects;
}

noChildren('5') /*?*/
noChildren('6') /*?*/
noChildren('2') /*?*/
noChildren('1') /*?*/