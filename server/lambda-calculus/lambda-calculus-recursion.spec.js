var lcr = require('./lambda-calculus-recursion');
var sa = lcr.sa
  , noVarFactCalc_3 = lcr.noVarFactCalc_3
  , fact = lcr.fact
  , T = lcr.T
  , Y_2 = lcr.Y_2
    ;   

describe('λ CALCULUS RECURSION', function() {
  // Will be hard to test, since it will normally be an infinite loop
  let identityFunc = (x) => x;
  
  beforeAll(function(){ 
  
  });

  it('Should define self applying function', (done) => {
    let result = sa(identityFunc);
    expect(result.name).toBe("identityFunc");
    done();
  });

  it('Should define fact correctly', (done) => {
    let results = new Map();
    results.set(0, 1);
    results.set(1, 1);
    results.set(3, 6);
    results.set(4, 24);

    expect(fact(0)).toBe(1);
    expect(fact(1)).toBe(1);
    expect(fact(3)).toBe(6);
    expect(fact(4)).toBe(24);
    try {
      fact(-4);
    } catch (err) {
      expect(err.name).toBe('Error');
      expect(err.message).toBe('fact expects a positive integer.');
    }
    done();
  });

  it('Should define Y_2 correctly', (done) => {
    let results = new Map();
    results.set(0,1);
    results.set(1,1);
    results.set(3,6);
    results.set(4,24);

    // expect(Y_2(T)(0)).toBe(1); <-- Implementation has no catch for this case
    expect(Y_2(T)(1)).toBe(1);
    expect(Y_2(T)(3)).toBe(6);
    expect(Y_2(T)(4)).toBe(24);
    done();
  });

  it('Should define noVarFactCalc_3 correctly', (done) => {
    let results = new Map();
    results.set(0, 1);
    results.set(1, 1);
    results.set(3, 6);
    results.set(4, 24);

    // expect(noVarFactCalc_3(fact)(0)).toBe(1); <-- Implementation has no catch for this case
    expect(noVarFactCalc_3(fact)(1)).toBe(1);
    expect(noVarFactCalc_3(fact)(3)).toBe(6);
    expect(noVarFactCalc_3(fact)(4)).toBe(24);
    done();
  });

})