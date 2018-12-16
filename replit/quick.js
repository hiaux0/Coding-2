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
	console.log("​stringParams", stringParams)
  const removeQuotesFromKey = (match) => {
    console.log(match)
    return match.replace(/"/g, "");
  }
  // match words between `{...:` and `,...:`.
  return stringParams.replace(/({|,)"\w+":/g, removeQuotesFromKey);
}

neoParamsBuilder({ name: 'hello', age: ['what', 'hello'] }) /*?*/

// properties will need a query

// { name: 'hiau', age: 15 }
// create(p: person { name: 'hiau', age: 15 }) return p
// create(p: person { name: $name, age: $age }) return p

function neoRelationshipBuilder({ nodeVars, relationshipName, params }) {
  params = neoParamsBuilder(params);
  let firstNode = nodeVars[0];
  let secondNode = nodeVars[1];
  return `(${firstNode}) - [:${relationshipName} ${params}] - (${secondNode});`;
}

neoRelationshipBuilder({ nodeVars: ['a', 'b'], relationshipName: 'KNOWS', params: {since: 2011} }); /*?*/

""+-13