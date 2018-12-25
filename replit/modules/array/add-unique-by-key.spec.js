const {addUniqueByKey} = require('./add-unique-by-key');

describe('addUniqueByKey', () => {
  const fromArray = [ { a: 1 }, { a: 3 } ];
  const toArray = [ { a: 1 }, { a: 2 } ];
  const expectedArray = [ { a: 1 }, { a: 2 }, { a: 3} ];

  const resultArray = addUniqueByKey({fromArray, toArray, key: 'a'});

  it('Should only add item if it is unique by key', done => {
    expect(resultArray.length).toBe(3);
    expect(JSON.stringify(resultArray)).toBe(JSON.stringify(expectedArray));
    done();
   });
});
