// https://neo4j.com/developer/javascript/

var neo4j = require('neo4j-driver').v1;
var serverConfig = require('../configs/server-config.json');
var user = serverConfig.neo4j.user;
var password = serverConfig.neo4j.password;

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));
var session = driver.session();

var personName = 'Alice';
var resultPromise = session.run(
  'CREATE (a:Person {name: $name}) RETURN a',
  { name: personName }
);

resultPromise.then(result => {
  session.close();

  var singleRecord = result.records[0];
  var node = singleRecord.get(0);

  console.log(node.properties.name);

  // on application exit:
  driver.close();
});