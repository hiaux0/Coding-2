var neo4j = require('neo4j-driver').v1;
var serverConfig = require('../configs/server-config.json');
var user = serverConfig.neo4j.user;
var password = serverConfig.neo4j.password;
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));

const { createDbNodesWithNameProp, createDbRelationshipsAImports } = require('./neo4j-api');

const persons = [
  {name: 'yj', id: 1, friends: ['hio']},
  {name: 'hio', id: 2, friends: ['yj', 'trung', 'mi']},
  {name: 'trung', id: 3, friends: ['yj', 'minh', 'mi']},
  {name: 'minh', id: 4, friends: ['yj']},
  {name: 'mi', id: 5, friends: ['yj', 'hio', 'trung']},
]
dropAllTables(); //fixme dev

createDbNodesWithNameProp(persons, (tx, person) => {
  let name = person.name;
  return tx.run('create (p: Person {name: $name}) return p;', {name});
})
.then(() => {
  createDbRelationshipsAImports(persons, (tx, fromPerson) => {
    let { friends } = fromPerson;
    createDbRelationshipsAImports(friends, (tx, friend) => {
      return tx
      .run(`
        match (f: Person) where f.name = '${fromPerson.name}'
        match (t: Person) where t.name = '${friend}'
        create (f)-[:KNOWS]->(t) return f,t;
      `);
    })
  })
});





function dropAllTables() {
  let session = driver.session(neo4j.WRITE);

  session.run('MATCH (n) DETACH DELETE n')
    .then(result => {
      // console.log("​dropAllTables -> result", result)
      return session.close()
    });
}