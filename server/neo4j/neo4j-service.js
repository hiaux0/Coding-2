var neo4j = require('neo4j-driver').v1;
var serverConfig = require('../configs/server-config.json');
var user = serverConfig.neo4j.user;
var password = serverConfig.neo4j.password;
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));
var uuidv1 = require('uuid/v1');


/**
 * Given an object use stringify and remove the quotes frome the key, to match
 * neo4j params
 *   {"key": "value"} --> {key: "value"}
 * @params {Object} params - neo4j params object.
 * @return {string} the built query string.
 */
function neoParamsBuilder(params) {
  if (!params) return '';
  let stringParams = JSON.stringify(params);
  const removeQuotesFromKey = (match) => match.replace(/"/g, "");
  // match words between `{...:` and `,...:`.
  return stringParams.replace(/({|,)"\w+":/g, removeQuotesFromKey);
}

/**
 * @param {} args
 * @prop {string} method ['create', 'match']
 * @prop {?Object} nodeName - name of the node
 * @prop {?Object} nodeVar - name of the node
 * @prop {Object} params - neo4j params object.
 * @prop {?boolean} returnVal - whether to return a value from the query.
 * @returns {string} the built query string
 */
function neoQueryBuilder({ method, nodeName, nodeVar, params, returnVal }) {
  let neo4jParam = neoParamsBuilder(params);
  //     '  CREATE  (: Person         {name: 'bob'})                                 ?return n;      '
  return `${method} (${nodeVar || ''}:${nodeName || ''} ${neo4jParam}) ${returnVal ? 'return n' : ''}`;
}

/**
 * @param {} args
 * @prop {string} method ['create', 'match', ...]
 * @prop {Object} nodeName - name of the node
 * @prop {Object} params - neo4j params object.
 */
function neoSingleQuery({ method, nodeName, params }) {
  console.log("​neoSingleQuery -> params", params)
  params.id = uuidv1();
  let neo4jParam = neoParamsBuilder(params);
  return `${method} (n:${nodeName || ''} ${neo4jParam}) return n;`
}

function neoRelationshipBuilder({nodeVars, relationshipName, params}) {
  params = neoParamsBuilder(params);
  let firstNode = nodeVars[0];
  let secondNode = nodeVars[1];
  return `CREATE (${firstNode}) - [:${relationshipName} ${params}] -> (${secondNode});`;
}


[
  {name: 'hiau', age: 25},
  {name: 'younjin', age: 25}
]



// createDbRelationships(rel);

/**
 * @example
  const a = {
    f: { name: 'hio' },
    r: { name: 'KNOWS', params: {since: 2014} },
    s: { name: 'yj' }
  }

  let rel = [a]
 *
 * @param {array} relationships between elements you want to establish
 * @param {Object} relConfig
 * @prop {string} firstNodeName
 * @prop {string} secondNodeName
 */
function createDbRelationships(relationships, relConfig) {
  let session;
  let relationshipQueryQueue = relationships.reduce((acc, relationship) => {
    session = driver.session(neo4j.WRITE);

    let firstMatchParams = relationship.f;
    let secondMatchParams = relationship.s;
    let relationshipMatchParams = relationship.r;

    let firstMatch = neoQueryBuilder({
      method: 'MATCH',
      nodeName: relConfig.firstNodeName,
      nodeVar: 'f',
      params: firstMatchParams
    });
    let secondMatch = neoQueryBuilder({
      method: 'MATCH',
      nodeName: relConfig.secondNodeName,
      nodeVar: 's',
      params: secondMatchParams
    });

    let createRelationship = neoRelationshipBuilder({
      nodeVars: ['f', 's'],
      relationshipName: relationshipMatchParams.name,
      params: relationshipMatchParams.params
    });
    let query = `${firstMatch} ${secondMatch} ${createRelationship}`;
		console.log("​createDbRelationships -> query", query)

    let createdRelationship = session.writeTransaction(tx => tx.run(query));
    acc.push(createdRelationship)
    return acc;
  }, []);

  return Promise.all(relationshipQueryQueue).then(() => session.close());
}

/**
 * @param {array} nodes with elements you want to create nodes of
 */
function createDbNodes(nodes, nodeName) {
  let createdNodeQuery = nodes.reduce((acc, node) => {
    let neoQuery = neoQueryBuilder({ method: 'CREATE', nodeName, params: node });
    acc.push(neoQuery);
    return acc;
  }, []);

  let query = createdNodeQuery.join('\n ');
	console.log("​createDbNodes -> query \n ---- \n", query)

  let session = driver.session(neo4j.WRITE);
  let nodeCreated = session.writeTransaction(tx => tx.run(query));
	// console.log("​createDbNodes -> nodeCreated", nodeCreated)
  return nodeCreated.then(data => {
    // console.log("​createDbNodes -> data", data)
    data.summary
		console.log("​createDbNodes -> data.summary", data.summary)
    session.close()
  });
}

/**
 * Create a neo4j node and return a promise resolving to the node + an uuid
 * @param {Object} node
 * @param {string} nodeName
 */
function createNode(node, nodeName) {
  let query = neoSingleQuery({ method: 'CREATE', nodeName, params: node });
  let session = driver.session(neo4j.WRITE);
  let createdNodeTx = session.writeTransaction(tx => tx.run(query));

  return createdNodeTx
    .then(({records}) => {
      session.close();
      return records[0].get(0).properties
    })
    .catch(err => console.error(err));
}

createNode({name: 'hio'}, 'Person').then(res => {
  console.log(res)
});

function createRelationship() {

}

// const names = [
//   { name: 'dennis' },
//   { name: 'duc' },
//   { name: 'trang' },
//   { name: 'minh' },
//   { name: 'nga' },
// ]

// createDbNodes(names, 'Person') /*?*/

module.exports = {
  createDbNodes,
  createDbRelationships
}