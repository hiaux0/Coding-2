// import { mergeAscending, mergeSort } from './merge-sort';
var ms = require('./merge-sort');
var mergeSort = ms.mergeSort
  , mergeAscending = ms.mergeAscending
    ;

describe('MERGE SORT', () => {
  let testArr1, testArr2, testArr3, testArr4, testArr5, testArr6,
      resultArray, mergedArray, arrayAfterMergeSort;
  const ascendingOrder = (a, b) => a - b;
  
  beforeAll( () => {
    testArr1 = [1, 1, 2, 3, 8];
    testArr2 = [1, 5, 5, 5, 5, 10];
    testArr3 = [7, 4, 3, 4, 7, 1, 332, 72, 90];
    testArr4 = [7, 4, 3, 4, 7, 1, 332, 72, 90];
    testArr5 = [5, 1, 5, 8, 2, 6, 7, 1123, 6, 4, 3817];
    testArr6 = [5, 1, 5, 8, 2, 6, 7, 1123, 6, 4, 3817];
  });
  
  it('Should merge 2 arrays with ascending order', done => {
    // Left array length less than right array length
    mergedArray = mergeAscending(testArr1, testArr2);
    resultArray = testArr1.concat(testArr2).sort(ascendingOrder);
    expect(mergedArray).toEqual(resultArray);
    
    // Right array length less than left array length
    mergedArray = mergeAscending(testArr2, testArr1);
    resultArray = testArr2.concat(testArr1).sort(ascendingOrder);
    expect(mergedArray).toEqual(resultArray);

    done();
  });

  it('Should succesfully use merge-sort algorithm to sort an array', done => {
    // Should successfully perform merge sort on even lenght arr
    testArr3.sort(ascendingOrder);
    arrayAfterMergeSort = mergeSort(testArr4);
    expect(arrayAfterMergeSort).toEqual(testArr3);
    
    // Should successfully perform merge sort on odd lenght arr
    testArr5.sort(ascendingOrder);
    arrayAfterMergeSort = mergeSort(testArr6);
    expect(arrayAfterMergeSort).toEqual(testArr5);

    done();
  })
})
