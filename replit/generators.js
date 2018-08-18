// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators

// /**
//  * Advanced generators
// Generators compute their yielded values on demand, which allows them to efficiently represent sequences that are expensive to compute, or even infinite sequences as demonstrated above.

// The next() method also accepts a value which can be used to modify the internal state of the generator. A value passed to next() will be treated as the result of the last yield expression that paused the generator.

// Here is the fibonacci generator using next(x) to restart the sequence:
//  */

// function* fibonacci() {
//   var fn1 = 0;
//   var fn2 = 1;
//   while (true) {
//     var current = fn1;
//     fn1 = fn2;
//     fn2 = current + fn1;
//     var reset = yield current; /*?*/
//     if (reset) {
//       fn1 = 0;
//       fn2 = 1;
//     }
//   }
// }

// var sequence = fibonacci();
// console.log(sequence.next().value);     // 0
// console.log(sequence.next().value);     // 1
// console.log(sequence.next().value);     // 1
// console.log(sequence.next().value);     // 2
// console.log(sequence.next().value);     // 3
// console.log(sequence.next().value);     // 5
// console.log(sequence.next().value);     // 8
// console.log(sequence.next(true).value); // 0
// console.log(sequence.next().value);     // 1
// console.log(sequence.next().value);     // 1
// console.log(sequence.next().value);     // 2


// function* gen() {
//   yield* ['a', 'b', 'c'];
// }

// gen().next(); // { value: "a", done: false }

// function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
//   let n = 0;
//   for (let i = start; i < end; i += step) {
//     n++;
//     i /*?*/
//     yield i; /*?*/
//   }
//   return n; /*?*/
// }

// let range = makeRangeIterator(0,3); /*?*/
// range.next().value /*?*/
// range.next().value /*?*/
// range.next() /*?*/
// range.next() /*?*/
// range.next().value /*?*/

const ABC = [
  "f", "j", "d", "k", "s", "l", "a", "g", "h", // home row
  "e", "i", "o", "w", "n", // upper
  "v", "c", "m", "q", "p" // lower
]

const ABC_JOIN = ABC.join('')

function* gen() {
  // yield* ABC_JOIN;
  yield* ABC;
}

let ok = gen();
for (let i in [1,2,3,4]) {
  console.log(ok.next().value)
}

