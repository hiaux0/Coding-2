const sa = (x) => x(x);

////////////////////////////////////////////////////////////////////////////////////////////
//
// https://www.ics.uci.edu/~lopes/teaching/inf212W12/readings/lambda-calculus-handout.pdf
// https://abdulapopoola.com/2015/08/23/y-combinator-demystified/

const fact = (n) => {
  if (n < 2) return 1;
  return n * fact(n-1);
}

const noVarFact = (fn) => (n) => {
  return fn(n)
}

noVarFact(fact)(5) /*?*/

const noVarFactCalc = (n) => {
  return noVarFact(fact)(n);
}

noVarFactCalc(5) /*?*/

const noVarFactCalc_1 = (n) => {
  return (
    (fn) => (n) => fn(n)
  )(fact)(n)
}

noVarFactCalc_1(5) /*?*/

const noVarFactCalc_2 = (t) => (n) => {
  return (
    (f) => (n) => f(n)
  )(t)(n)
}

noVarFactCalc_2(fact)(5) /*?*/

const noVarFactCalc_3 = (t) => (n) => ((f) => (n) => f(n)) (t)(n)

noVarFactCalc_3(fact)(5) /*?*/




////////////////////////////////////////////////////////////
//
// http://kestas.kuliukas.com/YCombinatorExplained/

const makeFact = (f) => {
  let fact = (n) => {
    if (n < 2) return 1;
    return n * f(n-1);
  }
  return fact;
}

const makeRealFact = (makeFact) => {
  let tryFact = (n) => {
    let nextTryFact = makeFact(tryFact)
    return nextTryFact(n); 
  }
  return makeFact(tryFact)
}

makeRealFact(makeFact)(5);

// Instead of `tryFact` calling itself to `makeFact` until it isn't needed, it calls `getNextTryFact`, which passes `tryFact` to `makeFact` for it.

const makeRealFact_1 = (makeFact) => {
  let generateFact = () => {
    let tryFact = (n) => {
      let nextTryFact = generateFact();
      return nextTryFact(n);
    }
    return makeFact(tryFact)
  }
  return generateFact();
}

makeRealFact_1(makeFact)(5); /*?*/

// But now `getNextTryFact` needs to refer to itself, so we need a way to refer to `getNextTryFact` without declaring it.
// This is done by passing `getNextTryFact` to itself as a parameter, and is the final adjustment needed to remove all self-referencing functions.

const makeRealFact_2 = (makeFact) => {
  let getNextTryFact = (getNextTryFactRef) => {
    let tryFact = (n) => {
      let nextTryFact = getNextTryFactRef(getNextTryFactRef);
      return nextTryFact(n);
    }
    return makeFact(tryFact)
  }
  return getNextTryFact(getNextTryFact);
}

makeRealFact_2(makeFact)(5); /*?*/

const makeRealFact_3 = (t) => {
  let getNextTryFact = (f) =>  t((n) => f(f)(n))
  return getNextTryFact(getNextTryFact);
}

makeRealFact_3(makeFact)(5); /*?*/

const makeRealFact_4 = (t) => sa((f) => t((n) => sa(f)(n))); 

makeRealFact_4(makeFact)(5); /*?*/



// https://gist.github.com/logicmason/0722b5b159a45f7a81b6

// Y = λt.(λx.t(x x))(λx.t(x x))
const Y   = (t) => sa((f) => t(       sa(f)   ));
const Y_2 = (t) => sa((f) => t((n) => sa(f)(n)));
Y_2(makeFact)(5) /*?*/


////////////////////////

//  (t) => (n) => ((f) => (n) => f(n))(t)(n)
//  (t) => sa((f) => t((n) => sa(f)(n))); 

//////////////////////////////////////////////////
//
// https://www.ics.uci.edu/~lopes/teaching/inf212W12/readings/lambda-calculus-handout.pdf

const fact1 = (n) => {
  if (n < 2) return 1;
  return n * fact1(n - 1);
}

// On the surface, this is a circular definition and cannot be expressed in lambda calculu.
// To resolve the difficulty, we first treat the right hand side of the definition as a funtion of "fact1".

const T = (f) => (n) => {
  if (n < 2) return 1;
  return n * f(n - 1);
}

// The definition of T is exactly the kind of circularity that the Y combinator allows us to capture.
// The Y combinator satisfies the equaity YT = T(YT).
// So, we can just say that factorial is YT and we get what we want without any circular definitions.

 
const fact2 = (n) => T(fact2)(n) 
fact2(5) /*?*/

Y_2(T)(5) /*?*/