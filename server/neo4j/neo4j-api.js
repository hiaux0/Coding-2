var neo4j = require('neo4j-driver').v1;
var serverConfig = require('../configs/server-config.json');
var user = serverConfig.neo4j.user;
var password = serverConfig.neo4j.password;
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));

/**
 *
 * @param {array} nodes with elements you want to create nodes of
 * @param {function} createNode
 *   @param {object} tx - given by neo4j
 *   @param {any} node - element of nodes.
 */
function createDbNodes(nodes, createNode) {
  let session;
  return nodes.reduce((promise, node) => {
    session = driver.session(neo4j.WRITE);

    let nodeCreated = session.writeTransaction(tx => createNode(tx, node))
    return promise.then(nodeCreated).then(() => {
      return session.close()
    })
  }, Promise.resolve());
}

/**
 *
 * @param {array} nodes with elements you want to create nodes of
 * @param {function} createRelationship
 *   @param {object} tx - given by neo4j
 *   @param {any} node - element of nodes.
 */
function createDbRelationships(nodes, createRelationship) {
  let session;
  return nodes.reduce((promise, node) => {
    session = driver.session(neo4j.WRITE);

    let createdRelationship = session.writeTransaction(tx => createRelationship(tx, node, nodes)
      .then(data => {
        // console.log("​createDbRelationships -> data.records", data.records)
        // let { records } = data;
        // console.log('------------------------------')
        // records.forEach(record => {
        //   console.log('>>>>>', record)
        //   console.log(`record.get('f')`, record.get('f'))
        //   console.log(`record.get('t')`, record.get('t'))
        // })
        // // let test = record.get(0)
				// // console.log("​createDbRelationships -> test", test)
        // console.log('------------------------------------------------------------')
      })
    )

    return promise.then(createdRelationship).then(() => {
      return session.close();
    }).catch(err => console.error(err))
  }, Promise.resolve());
}

module.exports = {
  createDbNodes,
  createDbRelationships
}

// Concepts learned in this file.
// https://stackoverflow.com/questions/24660096/correct-way-to-write-loops-for-promise
