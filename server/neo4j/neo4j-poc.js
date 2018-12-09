var neo4j = require('neo4j-driver').v1;
var serverConfig = require('../configs/server-config.json');
var user = serverConfig.neo4j.user;
var password = serverConfig.neo4j.password;
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));

const { createDbNodes, createDbRelationships } = require('./neo4j-api');

const persons = [
  {name: 'yj', id: 1, knows: 2},
  {name: 'hio', id: 2, knows: 3},
  {name: 'trung', id: 3, knows: 1},
  // {name: 'minh', id: 4, knows: 3},
  // {name: 'mi', id: 5, knows: 4},
]

// const persons = [
//   {name: 'yj', id: 1, friends: ['hio']},
//   {name: 'hio', id: 2, friends: ['yj', 'trung', 'mi']},
//   {name: 'trung', id: 3, friends: ['yj', 'minh', 'mi']},
//   {name: 'minh', id: 4, friends: ['yj']},
//   {name: 'mi', id: 5, friends: ['yj', 'hio', 'trung']},
// ]
// dropAllTables(); //fixme dev

createDbNodes(persons, (tx, person) => {
  let name = person.name;
  return tx.run('create (p: Person {name: $name})', {name});
})
.then(() => {
  // persons.reduce((promise, person) => {
  //   let session;
  //   return promise.then(() => {
  //     let {friends} = person;

  //     return friends.reduce((promise, friend) => {
  //       session = driver.session(neo4j.WRITE);

  //       let test = session.writeTransaction(tx => (tx, person) => {
  //         let fromPerson = person;
	// 				console.log("​fromPerson", fromPerson)
  //         let toPersonName = friend
	// 				console.log("​toPersonName", toPersonName)
  //         // let toPerson = persons.find(toPerson => toPerson.id === person.knows);
  //         return tx
  //           .run(`
  //           match (f: Person) where f.name = '${fromPerson.name}'
  //           match (t: Person) where t.name = '${toPersonName}'
  //           create (f)-[:KNOWS]->(t);
  //         `);
  //       })
  //       return promise.then((test) => session.close());

  //     }, Promise.resolve());

  //   });
  // }, Promise.resolve());

  createDbRelationships(persons, (tx, person, persons) => {
    let fromPerson = person;
		// console.log("​fromPerson", fromPerson)
    let toPerson = persons.find(toPerson => toPerson.id === person.knows);
		// console.log("​toPerson", toPerson)
    return tx
      .run(`
        match (f: Person) where f.name = '${fromPerson.name}'
        match (t: Person) where t.name = '${toPerson.name}'
        create (f)-[:KNOWS]->(t) return f,t;
    `);
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