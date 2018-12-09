// https://neo4j.com/developer/javascript/

var neo4j = require('neo4j-driver').v1;
var serverConfig = require('../configs/server-config.json');
var user = serverConfig.neo4j.user;
var password = serverConfig.neo4j.password;

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));
var session = driver.session(neo4j.WRITE);



var { getDepTree } = require('../features/dependency-tree.controller');

var depTree = getDepTree();


function dropAllTables() {
  session.run('MATCH (n) DETACH DELETE n')
    .then(result => {
			// console.log("​dropAllTables -> result", result)
      session.close()
    });
}

let count = 0;

function initFileNodes(depTree) {
  dropAllTables(); //fixme dev
  let session;

  createFileNodes(depTree).then(()=>{
    createFileDeps(depTree);
  })



  function createFileNodes(depTree) {
    function createFileNode(tx, fileName) {
      return tx.run('create (f: FileName {name: $name})', { name: fileName });
    }

    return depTree.reduce((promise, fileData) => {
      session = driver.session(neo4j.WRITE);
      let fileName = fileData[0];

      let createdFileNode = session.writeTransaction(tx => createFileNode(tx, fileName));
      return promise.then(createdFileNode).then(() => session.close())

    }, Promise.resolve())
  }

  function createFileDeps(depTree) {
    function createFileDep(tx, fromFileName, toFileName) {
      return tx.run(`
        match (f: FileName) where f.name = '${fromFileName}'
        match (t: FileName) where t.name = '${toFileName}'
        create (f) - [:IMPORTS] -> (t);
      `)

    }

    let count = 0;
    return depTree.reduce((promise, fileData) => {
      console.log('-------------------------------', count++, '-------------------------------')
			console.log("​createFileDeps -> fileData", fileData)
      session = driver.session(neo4j.WRITE);
      let fromFileName = fileData[0];
      let toFileName = Object.keys(fileData[1])[1];
      console.log("​createFileDeps -> toFileName", toFileName)
      if (toFileName === '_parentId') return Promise.resolve();

      let createdFileDep = session.writeTransaction(tx => createFileDep(tx, fromFileName, toFileName))
      return promise.then(createdFileDep).then(() => session.close());
    }, Promise.resolve());
  }
}


initFileNodes(depTree);

module.exports = {
  dropAllTables
}