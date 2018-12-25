const {resetState} = require('./reset-state');

describe('resetState', () => {
  let initialState = { a: null , b: null , c: null , d: 'no touch' };
  let editedState = { a: 2 , b: 3 , c: 4 , d: 'dirty' };

  let reset = resetState({
    initialState,
    editedState,
    keys: ['a', 'b', 'c']
  });

  it('Should reset state based on keys', () => {
    expect(JSON.stringify(reset.a)).toBe(JSON.stringify(initialState.a));
    expect(JSON.stringify(reset.b)).toBe(JSON.stringify(initialState.b));
    expect(JSON.stringify(reset.c)).toBe(JSON.stringify(initialState.c));
  });

  it('Should not touch other keys', () => {
    expect(JSON.stringify(reset.d)).toBe(JSON.stringify(editedState.d));
   });

  it('Should throw on keys which are not present in intial state', () => {
    expect(function() {
      resetState({
        initialState,
        editedState,
        keys: ['z']
      })
    }).toThrow('`editedState` does not have a property "z"')
  });
});
