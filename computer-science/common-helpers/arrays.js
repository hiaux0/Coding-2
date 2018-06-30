
/**
 * Fill an array with random numbers.
 * @param {Number} length - How many values should be generated.
 * @param {Number} numOfDigits - Number of digits each numbers can have.
 */
const createRandomArr = (length, numOfDigits) => {
  let rndArr = [];
  for (let i = 0; i < length; i++) {
    rndArr[i] = Math.round(Math.random() * numOfDigits);
  }
  return rndArr;
}

export {
  createRandomArr
}