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
function createDbNodesWithNameProp(nodes, createNode) {
  let nodeCreated, session;
  let test = nodes.reduce((acc, node) => {
    session = driver.session(neo4j.WRITE);
    nodeCreated = session.writeTransaction(tx => createNode(tx, node))
    acc.push(nodeCreated)
    return acc;
  }, []);

  return Promise.all(test).then(() => session.close());
}

/**
 *
 * @param {array} nodes with elements you want to create nodes of
 * @param {function} createRelationship
 *   @param {object} tx - given by neo4j
 *   @param {any} node - element of nodes.
 */
function createDbRelationshipsAImports(nodes, createRelationship) {
  let createdRelationship, session;
  let test = nodes.reduce((acc, node) => {
    session = driver.session(neo4j.WRITE);
    createdRelationship = session.writeTransaction(tx => createRelationship(tx, node, nodes))
    acc.push(createdRelationship)
    return acc;
  }, []);

  return Promise.all(test).then(() => session.close());
}

module.exports = {
  createDbNodesWithNameProp,
  createDbRelationshipsAImports
}

// Concepts learned in this file.
// https://stackoverflow.com/questions/24660096/correct-way-to-write-loops-for-promise
