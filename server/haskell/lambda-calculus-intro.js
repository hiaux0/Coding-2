/**
 * First definitions
 * Definition [True]  : λx. λy.  x 
 * Definition [False] : λx. λy.  y 
 * Definition [Not]   : λb.b True False 
 * Proof by implementing `Not` (see `λ_not`)
 */

/**
 * @param {any} x - As part of the definition of λ_true, `x` is of no specific type
 * @param {any} y - As part of the definition of λ_true, `y` is of no specific type
 */
const λ_true = x => y => x 

/**
 * @param {any} x - As part of the definition of λ_false, `x` is of no specific type.
 * @param {any} y - As part of the definition of λ_false, `y` is of no specific type.
 */
const λ_false = x => y => y

/**
 * @param {λ_boolean} b - Takes in a λ_boolean and 
 * @return its `not` counter part.
 */
const λ_not = b => b(λ_false)(λ_true) 

/**
 * 
 * @param {λ_boolean} a  
 * @param {λ_boolean} b 
 */
const λ_and = a => b => b(a)(b)

module.exports = {
λ_true: λ_true,
λ_false: λ_false,
λ_not: λ_not,
λ_and: λ_and
}