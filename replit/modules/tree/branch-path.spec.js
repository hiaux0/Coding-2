const { buildBranchPath, completePathRetrieved, getSiblingIds, getDirectChildrenIds, allChildrenAreChecked } = require('./branch-path');

let allFolders = [
  { name: 'f-root-1', id: '1', parentId: null },
  { name: 'f-nested-1-1', id: '2', parentId: '1' },
  { name: 'f-nested-1-1-1', id: '3', parentId: '2' },
  { name: 'f-nested-1-1-2', id: '4', parentId: '2' },
  { name: 'f-nested-1-2', id: '5', parentId: '1' },
  { name: 'f-nested-1-3', id: '6', parentId: '1' },
  { name: 'f-nested-1-3-1', id: '8', parentId: '6' },
  { name: 'f-nested-1-3-2', id: '9', parentId: '7' },
  { name: 'f-root-2', id: '7', parentId: null },
  { name: 'f-nested-2-1', id: '11', parentId: '7' },
  { name: 'f-nested-2-1-1', id: '10', parentId: '9' }
];

describe('buildBranchPath', () => {
  it('Should build complete path for each branch', done => {
    let paths = buildBranchPath({
      tree: allFolders,
      rootId: null,
    });

    expect(JSON.stringify(paths['1'])).toBe(JSON.stringify([null]));
    expect(JSON.stringify(paths['2'])).toBe(JSON.stringify([null, '1']));
    expect(JSON.stringify(paths['3'])).toBe(JSON.stringify([null, '1', '2']));
    expect(JSON.stringify(paths['4'])).toBe(JSON.stringify([null, '1', '2']));
    expect(JSON.stringify(paths['5'])).toBe(JSON.stringify([null, '1']));
    expect(JSON.stringify(paths['8'])).toBe(JSON.stringify([null, '1', '6']));
    done();
  });

  it('Should fill in newly added branches', () => {
    let currentPaths = {
      "1": [null],
      "2": [null, '1'],
      "3": [null, '1', '2'],
      "4": [null, '1', '2'],
      "5": [null, '1'],
      "6": [null, '1'],
      "7": [null],
      "8": [null, '1', '6'],
      "9": [null, '7'],
      "10": [null, '7', '9']
    }

    let withNewlyAddedFolders = [
      ...allFolders,
      { name: 'f-nested-1-3-3', id: '12', parentId: '7' },
      { name: 'f-nested-1-3-4', id: '13', parentId: '12' },
      { name: 'f-nested-2-1-1', id: '10', parentId: '9' },
      { name: 'f-nested-2-1-1-1', id: '14', parentId: '10' },
    ]

    let paths = buildBranchPath({ tree: withNewlyAddedFolders, rootId: null, branchPathMap: currentPaths });
    expect(JSON.stringify(paths['10'])).toBe(JSON.stringify([null, '7', '9']));
    expect(JSON.stringify(paths['12'])).toBe(JSON.stringify([null, '7']));
    expect(JSON.stringify(paths['13'])).toBe(JSON.stringify([null, '7', '12']));
    expect(JSON.stringify(paths['14'])).toBe(JSON.stringify([null, '7', '9', '10']));
  });

  it('Should update path if branch changed position in the tree', () => {
    let baseFolders = [
      {id: '1', parentId: null},
      {id: '2', parentId: '1'},
      {id: '3', parentId: '1'},
    ];

    let wthiOldFolderPosition = [
      ...baseFolders,
      {id: '4', parentId: '2'}
    ]

    let originalPaths = buildBranchPath({tree: wthiOldFolderPosition, rootId: null});
    expect(JSON.stringify(originalPaths['4'])).toBe(JSON.stringify([null, '1', '2']));

    let withMovedFolderPosition = [
      ...baseFolders,
      {id: '4', parentId: '3'}
    ]

    let paths = buildBranchPath({ tree: withMovedFolderPosition, rootId: null});
    expect(JSON.stringify(paths['4'])).toBe(JSON.stringify([null, '1', '3']));
   });
});

describe('completePathRetrieved', () => {
  let mockPaths = {
    '1': [null],
    '2': [null, '1'],
    '3': [null, '1', '2'],
    '4': undefined
  }

  it('Should return true if every path contains `rootId`', done => {
    const correctPaths = {
      ...mockPaths,
      '4': [null, '1']
    }

    let result = completePathRetrieved(correctPaths, null);
    expect(result).toBe(true);
    done();
  });

  it('Should return false if not every path does not contain `rootId`', done => {
    const withOneIncompletePath = {
      ...mockPaths,
      '4': ['1']
    }

    let result = completePathRetrieved(withOneIncompletePath, null);
    expect(result).toBe(false);
    done();
  });

  it('Should return false if every path does not contain `rootId`', done => {
    const withOneIncompletePath = {
      '1': ['2'],
      '2': ['4'],
      '3': ['8'],
      '4': ['1']
    }

    let result = completePathRetrieved(withOneIncompletePath, null);
    expect(result).toBe(false);
    done();
  });
});

describe('getSiblingIds', () => {
  const currentPaths = {
    "1": [null],
    "2": [null, '1'],
    "3": [null, '1', '2'],
    "4": [null, '1', '2'],
    "5": [null, '1'],
    "6": [null, '1'],
    "7": [null],
    "8": [null, '1', '6'],
    "9": [null, '7'],
    "10": [null, '7', '9']
  };

  const siblingsOf1 = getSiblingIds('2', currentPaths);

  it('Should return the correct siblings', () => {
    expect(JSON.stringify(siblingsOf1)).toBe(JSON.stringify(['5', '6']));
  });

  it('Should not return the wrong siblings', () => {
    expect(siblingsOf1).not.toContain('9');
  });

  it('Should return the node itself, if it has no siblings', () => {
    const siblingsOf9 = getSiblingIds('9', currentPaths);
    expect(JSON.stringify(siblingsOf9)).toBe(JSON.stringify([]));
  });

  it('Should throw an error if id is not in map', () => {
    const wrongKey = 'sht';
    expect(getSiblingIds(wrongKey, currentPaths)).toBe(undefined);
   });
});

describe('getDirectChildrenIds', () => {
  const currentPaths = {
    "1": [null],
    "2": [null, '1'],
    "3": [null, '1', '2'],
    "4": [null, '1', '2'],
    "5": [null, '1'],
    "6": [null, '1'],
    "7": [null],
    "8": [null, '1', '6'],
    "9": [null, '7'],
    "10": [null, '7', '9']
  };

  it('Should select direct children', () => {
    const directChildrenIds = ['2', '5', '6']
    const result = getDirectChildrenIds('1', currentPaths)
    expect(JSON.stringify(result)).toBe(JSON.stringify(directChildrenIds))
  });

  it('Should return an empty array if there are no direct children', () => {
    const result = getDirectChildrenIds('10', currentPaths)
    expect(JSON.stringify(result)).toBe(JSON.stringify([]))
  });
});

describe('allChildrenAreChecked', () => {
  const currentPaths = {
    "1": [null],
    "2": [null, '1'],
    "3": [null, '1', '2'],
    "4": [null, '1', '2'],
    "5": [null, '1'],
    "6": [null, '1'],
    "7": [null],
    "8": [null, '1', '6'],
    "9": [null, '7'],
    "10": [null, '7', '9']
  };

  it('Should early return if id not in path map', () => {
    const result = allChildrenAreChecked('a', [], currentPaths);
    expect(result).toBeUndefined();
  });

  it('Should return true if children are checked', () => {
    const withCheckedChildren = ['2', '3', '4', '5', '6', '8'];
    const areChecked = allChildrenAreChecked('1', withCheckedChildren, currentPaths);
    expect(areChecked).toBe(true);
  });

  it('Should retun false if children are not all checked', () => {
    const notAllCheckedChildren = ['2', '3', '4', '5'];
    const areChecked = allChildrenAreChecked('1', notAllCheckedChildren, currentPaths);
    expect(areChecked).toBe(false);
  });

  it('Should retun false if no children are checked', () => {
    const areChecked = allChildrenAreChecked('1', [], currentPaths);
    expect(areChecked).toBe(false);
  });
});
