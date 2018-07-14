// What do I remember from last nights video?
// You define a function in λ-calculus as follow:
// λx. x --> identity

/**
 * First definitions
 * Definition [True]  : λx. λy.  x 
 * Definition [False] : λx. λy.  y 
 * Definition [Not]   : λb.b True False 
 * Proof by implementing `Not`
 */

// λ_booleans
const λ_true = x => y => x 
λ_true(1)(2) /*?*/

const λ_false = x => y => y
λ_false(1)(2) /*?*/

/**
 * 
 * {^1} The λ-calc definition would take a `λ_boolean`, but it is not possible in JS to assume a function like λ_true as the  @param {λ_boolean} b - takes in a λ_bool of the form λ_true, λ_false. Ie. a function with 2 arguments.
 * So, currenty we will take @param {Boolean} b 
 * 
 * @return {λ_boolean}
 */
const λ_not_1 = b => {
  // TODO check if b is of type λ_bool
  if (b) {
    return λ_false;
  } else {
    return λ_true;
  }
}

λ_not_1(false)(1)(2) /*?*/

// {^1} : We can actually come closer to the formal definition if we do it this way:
const λ_not_2 = (bool, a, b) => {
  bool(a)(b)
}

λ_not_2(λ_true, λ_false, λ_true) /*?*/
λ_not_2(λ_false, λ_false, λ_true) /*?*/

// Next try, want sth like this
// Basically beta-reduce λ_not_1

const λ_not = b => b(λ_false)(λ_true) 
λ_not(λ_true) /*?*/
λ_not(λ_false) /*?*/

let result =(λ_not(λ_true))

/*********************************
 *     AND , OR
 */

// λ_and(λ_bool, λ_bool) --> λ_bool && λ_bool

/**
 * t  t  -> t  
 * t  f  -> f
 * f  t  -> f
 * f  f  -> f
 */
λ_true(λ_false)(λ_true) /*?*/
λ_false(λ_false)(λ_true) /*?*/

λ_true(λ_false)  /*?*/
λ_true(λ_true) /*?*/

λ_true(λ_true)(λ_true) /*?*/
λ_true(λ_false)(λ_true) /*?*/
λ_true(λ_true)(λ_false) /*?*/
λ_true(λ_false)(λ_false) /*?*/

// Only the 3. one is wrong

λ_false(λ_true)(λ_false) /*?*/
λ_false(λ_false)(λ_false) /*?*/

// So this would result in

const λ_and = a => b => b(a)(b)

λ_and(λ_true)(λ_true) /*?*/
λ_and(λ_false)(λ_true) /*?*/
λ_and(λ_true)(λ_false) /*?*/
λ_and(λ_false)(λ_false) /*?*/

export {
  λ_true,
  λ_false,
  λ_not,
  λ_and
}