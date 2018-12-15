// createNode
// node name
// properties

function createNode(nodeName, properties) {
  return `CREATE (a:${nodeName} ${JSON.stringify(properties)})`;
}

createNode('what', {name: 'hello', age: 15, saying: 'hello'}) /*?*/

let string = 'CREATE (a:what {"name":"hello","age":15,"saying":"hello"})​​​​​';
string.replace(/{"/g, '{')
      .replace(/,"/g,",")
      .replace(/":/g,":") /*?*/
// createPropertyString

function neoParamsBuilder(params) {
  let stringParams = JSON.stringify(params);
  const removeQuotesFromKey = (match) => match.replace(/"/g, "");
  // match words between `{...:` and `,...:`.
  return stringParams.replace(/({|,)"\w+"/g, removeQuotesFromKey);
}

neoParamsBuilder({ name: 'hello', age: 15, saying: 'hello' }) /*?*/

// properties will need a query

// { name: 'hiau', age: 15 }
// create(p: person { name: 'hiau', age: 15 }) return p
// create(p: person { name: $name, age: $age }) return p