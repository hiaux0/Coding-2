var neo4j = require('neo4j-driver').v1;
var serverConfig = require('../configs/server-config.json');
var user = serverConfig.neo4j.user;
var password = serverConfig.neo4j.password;
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));

const { createDbNodesWithNameProp, createDbRelationshipsAImports } = require('./neo4j-api');
const { createDbNodes, createDbRelationships } = require('./neo4j-service');


const persons = [
  {name: 'yj', id: 1, friends: ['hio']},
  {name: 'hio', id: 2, friends: ['yj', 'trung', 'mi']},
  {name: 'trung', id: 3, friends: ['yj', 'minh', 'mi']},
  {name: 'minh', id: 4, friends: ['yj']},
  {name: 'mi', id: 5, friends: ['yj', 'hio', 'trung']},
]

const company = [
  {name: 'blizzard'},
  {name: 'nintendo'}
]

const games = [
  {name: 'wcthree', id: 2},
  {name: 'lol', id: 2},
  {name: 'wow', id: 2}
]

const createdRel = [
  {
    f: { name: 'blizzard'},
    r: { name: 'created', params: { created_date: 1997 } },
    s: { name: 'wcthree' },
  }
]

dropAllTables()
.then(createDbNodes(company, 'Company'))
// .then(createDbNodes(games, 'Game'))
// .then(() => {
//   createDbRelationships(createdRel, { firstNodeName: 'Company', secondNodeName: 'Game' })
// })


////////////////////////

// createDbNodes(persons, 'Person');

const a = {
  f: { name: 'hio' },
  r: { name: 'KNOWS', params: { since: 2014 } },
  s: { name: 'yj' }
}

let rel = [a]

// createDbRelationships(rel, { firstNodeName: 'Person', secondNodeName: 'Person' });



// createDbNodesWithNameProp(persons, (tx, person) => {
//   let name = person.name;
//   return tx.run('create (p: Person {name: $name}) return p;', {name});
// })
// .then(() => {
//   createDbRelationshipsAImports(persons, (tx, fromPerson) => {
//     let { friends } = fromPerson;
//     createDbRelationshipsAImports(friends, (tx, friend) => {
//       return tx
//       .run(`
//         match (f: Person) where f.name = '${fromPerson.name}'
//         match (t: Person) where t.name = '${friend}'
//         create (f)-[:KNOWS]->(t) return f,t;
//       `);
//     })
//   })
// });





function dropAllTables() {
  let session = driver.session(neo4j.WRITE);

  return session.run('MATCH (n) DETACH DELETE n')
    .then(result => {
      // console.log("​dropAllTables -> result", result)
      return session.close()
    });
}