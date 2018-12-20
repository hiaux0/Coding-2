const { buildBranchPath, completePathRetrieved } = require('./build-branch-path');

let allFolders = [
  { name: 'f-root-1', id: '1', parentId: null },
  { name: 'f-nested-1-1', id: '2', parentId: '1' },
  { name: 'f-nested-1-1-1', id: '3', parentId: '2' },
  { name: 'f-nested-1-1-2', id: '4', parentId: '2' },
  { name: 'f-nested-1-2', id: '5', parentId: '1' },
  { name: 'f-nested-1-3', id: '6', parentId: '1' },
  { name: 'f-nested-1-3-2', id: '9', parentId: '7' },
  { name: 'f-nested-1-3-1', id: '8', parentId: '6' },
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

  });
});

xdescribe('completePathRetrieved', () => {
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
