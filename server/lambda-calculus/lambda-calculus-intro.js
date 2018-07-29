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

const λ_or = a => b => a(a)(b)
λ_or(λ_true)(λ_true); /*?*/
λ_or(λ_true)(λ_false); /*?*/
λ_or(λ_false)(λ_true); /*?*/
λ_or(λ_false)(λ_false); /*?*/

module.exports = {
λ_true: λ_true,
λ_false: λ_false,
λ_not: λ_not,
λ_and: λ_and,
λ_or: λ_or
}

///////////////////////////////
//
//         Conclusion

/**
 * Here I want to write a small "tutorial", ideally "course", which teaches λ-Calculus through javascript.
 * Why javascript? It is what I know. It would make sense to directly use Haskell with its typing, but again,
 * I only know javascript good enough, too somehow feel comfortable with the language.
 * Though the results here, should be applicable to any language, and I welcome any conversion.
 * 
 * Where do we start? Or better where did I start?
 * 1. https://www.youtube.com/watch?v=eis11j_iGMs&t=444s 
 *   - This video was the initial motivation behind this little project.
 *   - While watching I already tried to paused and pounder about the way how you would define the definitions in the video..
 * 
 * The next source should ideally not be used. When I struggled finding a way for `λ_and`, I tried to google a bit. Even though the link does not provide any clear connection to the implementation, it gave me the final push to solve the implementation.
 * 
 * 2. https://medium.com/functional-javascript/lambda-calculus-in-javascript-part-1-28ff63824d4d
 *   - this article unfortunately only consists of part 1, and is not furhter continued.
 * 
 * Your first task would be to try and implement `λ_true`, `λ_false`, and `λ_not`.
 * Next would be to try `λ_and` and `λ_or`.
 * TODO: Currently I am not satasfied by the "type" `λ_boolean`
 * 
 * In the end, what did I got by implementing these definitions in javascript?
 * - Got me closer to the premise of functional programming
 * - Got me closer to the motivation behind functional programming
 * - Motivated me to go deeper into funtional programming
 * 
 */
