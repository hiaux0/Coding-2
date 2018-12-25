// https://neo4j.com/developer/javascript/

var neo4j = require('neo4j-driver').v1;
var serverConfig = require('../configs/server-config.json');
var user = serverConfig.neo4j.user;
var password = serverConfig.neo4j.password;

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));
var session = driver.session(neo4j.WRITE);

const { createDbNodesWithNameProp, createDbRelationshipsAImports } = require('./neo4j-api');


var { getDepTree } = require('../features/dependency-tree.controller');

/**
 * @typedef {Object} FileWithImportsEnhanced
 * @property {number} id
 * @property {number} parentId
 * @property {string} <imported-file-name> (repeat)
 */

/**
 * @typedef {Array['<file-name>', FileWithImportsEnhanced]} DepTreeAsArray
 */

/**
 * @type {DepTreeAsArray}
 */
var depTree = getDepTree();


function dropAllTables() {
  session.run('MATCH (n) DETACH DELETE n')
    .then(_ => {
      session.close()
    });
}

initFileNodes(depTree);

/**
 * @param {DepTreeAsArray}
 * @void create nodes with relationships for files in neo4j
 */
function initFileNodes(depTree) {
  // dropAllTables(); //fixme dev
  let fileNames = depTree.map(([fileName, _]) => fileName);

  createDbNodesWithNameProp(fileNames, (tx, fileName) => {
    return tx.run('create (f: FileName {name: $fileName}) return f;', { fileName });
  })
    .then(() => {
      createDbRelationshipsAImports(depTree, (tx, [fileName, fileImports]) => {
        let keys = Object.keys(fileImports)
        createDbRelationshipsAImports(keys, (tx, key) => {
          if (key === '_id' || key === '_parentId') return Promise.resolve();
            return tx.run(`
              match (f: FileName) where f.name = '${fileName}'
              match (t: FileName) where t.name = '${key}'
              create (f)-[:IMPORTS]->(t) return f,t;
            `);
        })
      })
    });
}



neoBuilder({
  method: 'create',
  params: {
    name: 'hiau',
    age: '25'
  }
})

module.exports = {
  dropAllTables
}