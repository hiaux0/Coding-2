let obj = {
  a: 1,
  b: 2,
  c: 3,
}

let ok = {...obj}; /*?*/
obj /*?*/
// Now I want to change one value in obj without mutating it

ok.a = 5;
ok /*?*/
obj /*?*/

// Without spread operator should mutate, right?

let abc = obj /*?*/
obj /*?*/
abc.a = 5
abc /*?*/
obj /*?*/