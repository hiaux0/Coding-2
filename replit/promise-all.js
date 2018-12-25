
let waitOneSec = new Promise((resolve) => {
  setTimeout(() => {
    console.log('1 sec')
    resolve('1 sec over');
  }, 100)
});

let waitTwoSec = new Promise((resolve) => {
  setTimeout(() => {
    console.log('2 sec')
    resolve('2 sec over');
  }, 200)
});

let all = Promise.all([
  waitOneSec,
  waitTwoSec
]).then(([first, second]) => {
  first
  second
  return 'donee'
});

const caller = () => {
  return Promise.all([
    waitOneSec,
    waitTwoSec
  ]).then(([first, second]) => {
    first
    second
    return 'donee'
  });;
}

let final = caller() /*?*/
final.then(data => {
  data
})