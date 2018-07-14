/**
 * Merge two arrays in ascending order. Note that due to merge sort logic, 
 * each array is already sorted, and their length differ at maximal 1.
 * 
 * @param {Array} leftArr      
 * @param {Array} rightArr  
 */
const mergeAscending = (leftArr, rightArr) => {
  const lArrLen = leftArr.length;
  const rArrLen = rightArr.length;
  let resultArr = [];

  while ( resultArr.length < lArrLen + rArrLen) {
    let [lHead, ...lTail] = leftArr;
    let [rHead, ...rTail] = rightArr;
    if (rHead <= lHead) {
      resultArr.push(rHead);
      rightArr = rTail;
    } else if (lHead === undefined) {
      return resultArr.concat(rightArr);
    } else {
      resultArr.push(lHead);
      leftArr = lTail;
    }
  }
  return resultArr;
}

/**
 * Perform merge sort on an array. 
 * This sorting algorithm is based on the prinicple of divide and conquer:
 * We first _divide_ (split) the given array into subarrays recursively, 
 * and than _conquer_ (merge) the subarrays by calling `merge()`. 
 * 
 * @param {Array} arr 
 */
const mergeSort = (arr) => {
  if (arr.length === 1) return arr;
  else if (arr.length === 2) {
    if (arr[0] > arr[1]) return [arr[1], arr[0]];
    return arr;
  }
  let splitIndex = arr.length / 2;
  let leftArr = mergeSort(arr.slice(0, splitIndex));
  let rightArr = mergeSort(arr.slice(splitIndex, arr.length));
  return mergeAscending(leftArr, rightArr);
}

export {
  mergeAscending,
  mergeSort
}