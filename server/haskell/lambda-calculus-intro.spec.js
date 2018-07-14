import { λ_true, λ_false, λ_not, λ_and } from './lambda-calculus-intro'

describe('λ CALCULUS INIT', () => {

  it('Should define λ_true', (done) => {
    let res = λ_true(1)(20)
    expect(res).toBe(1)
    done();
  });

  it('Should define λ_false', (done) => {
    let result = λ_false(1)(20);
    expect(result).toBe(20);
    done();
  });

  it('Should define λ_not, and return the correct result for "λ_true"', (done) => {
    let result = λ_not(λ_true);
    expect(result.name).toBe("λ_false")
    done();
  })

  it('Should define λ_not, and return the correct result for "λ_false"', (done) => {
    let result = λ_not(λ_false);
    expect(result.name).toBe("λ_true")
    done();
  })

});