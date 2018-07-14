// const λ_true = x => y => x
// λ_true(1)(2) /*?*/

// const λ_false = x => y => y
// λ_false(1)(2) /*?*/

// const λ_not = (bool, a, b) => {
//   bool(a)(b)
//   console.log(bool(a)(b))
// }

// λ_not(λ_true, λ_false, λ_true) /*?*/
// λ_not(λ_false, λ_false, λ_true) /*?*/


// This is already close to the formal definition.
// Is there still a better way?

(x => y => x)(1)(2) /*?*/
const what = s => s(s) // applies the function to itself
const id = x => x
what(id) /*?*/
// id => id(id)
// (x => x) => (x => x)(x => x)
// returns (x => x)

f => x => f(x)


