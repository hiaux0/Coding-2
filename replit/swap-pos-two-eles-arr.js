let arr = [1,2,3,4,5,6]

const swap = (baseIndex, withIndex) => {
  // remove
  let baseValue = arr[baseIndex]; /*?*/
  let withValue = arr[withIndex] /*?*/
  arr[baseIndex] = withValue; /*?*/
  arr[withIndex] = baseValue; /*?*/
  return arr
}

swap(1,5); /*?*/