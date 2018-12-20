let mapper = new Map();
mapper.size /*?*/



mapper.set('hi', 'hi')
mapper.set('what', 'hi')
mapper.set('eshtn', 'hi')
mapper.set('ehst', 'hi')

// mapper.forEach((value, key) => {
//   key
//   value
// })

let vals = mapper.values();
Array.from(vals).some(val => val === 'hi') /*?*/
