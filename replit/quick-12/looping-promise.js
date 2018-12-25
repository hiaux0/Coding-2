// Given async function sayHi
function sayHi(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(name);
      resolve();
    }, 1000);
  });
}

// And an array of async functions to loop through
const names = ["what", 'okay', 'when'];

// We create the start of a promise chain
let chain = Promise.resolve();

// And append each function in the array to the promise chain
// let asyncArray = [];
// for (const name of names) {
//   chain = chain.then(sayHi(name));
//   asyncArray.push(chain)
// }

function fetchUserDetails(arr) {
  return arr.reduce(function (promise, name) {
    return promise.then(function () {
      return sayHi(name)
    });
  }, Promise.resolve());
}

fetchUserDetails(names).then(function () {
  console.log('all done');
});