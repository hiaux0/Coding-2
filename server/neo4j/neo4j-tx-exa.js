var neo4j = require('neo4j-driver').v1;
var serverConfig = require('../configs/server-config.json');
var user = serverConfig.neo4j.user;
var password = serverConfig.neo4j.password;
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));

// Create a company node
function addCompany(tx, name) {
  return tx.run('CREATE (a:Company {name: $name})', { 'name': name });
}

// Create a person node
function addPerson(tx, name) {
  return tx.run('CREATE (a:Person {name: $name})', { 'name': name });
}

// Create an employment relationship to a pre-existing company node.
// This relies on the person first having been created.
function addEmployee(tx, personName, companyName) {
  return tx.run('MATCH (person:Person {name: $personName}) ' +
    'MATCH (company:Company {name: $companyName}) ' +
    'CREATE (person)-[:WORKS_FOR]->(company)', { 'personName': personName, 'companyName': companyName });
}

// Create a friendship between two people.
function makeFriends(tx, name1, name2) {
  return tx.run('MATCH (a:Person {name: $name1}) ' +
    'MATCH (b:Person {name: $name2}) ' +
    'MERGE (a)-[:KNOWS]->(b)', { 'name1': name1, 'name2': name2 });
}

// To collect friend relationships
const friends = [];

// Match and display all friendships.
function findFriendships(tx) {
  const result = tx.run('MATCH (a)-[:KNOWS]->(b) RETURN a.name, b.name');

  result.subscribe({
    onNext: record => {
      const name1 = record.get(0);
      const name2 = record.get(1);

      friends.push({ 'name1': name1, 'name2': name2 });
    }
  });
}

// To collect the session bookmarks
const savedBookmarks = [];

// Create the first person and employment relationship.
const session1 = driver.session(neo4j.WRITE);
const first = session1.writeTransaction(tx => addCompany(tx, 'Wayne Enterprises'))
.then(() => session1.writeTransaction(tx => addPerson(tx, 'Alice')))
.then(() => session1.writeTransaction(tx => addEmployee(tx, 'Alice', 'Wayne Enterprises')))
.then(() => {
    savedBookmarks.push(session1.lastBookmark());
    return session1.close();
  });

// Create the second person and employment relationship.
const session2 = driver.session(neo4j.WRITE);
const second = session2.writeTransaction(tx => addCompany(tx, 'LexCorp'))
.then(() => session2.writeTransaction(tx => addPerson(tx, 'Bob')))
.then(() => session2.writeTransaction(tx => addEmployee(tx, 'Bob', 'LexCorp')))
.then(() => {
  savedBookmarks.push(session2.lastBookmark());
  return session2.close();
});

// Create a friendship between the two people created above.
const last = Promise.all([first, second]).then(ignore => {
  const session3 = driver.session(neo4j.WRITE, savedBookmarks);

  return session3.writeTransaction(tx => makeFriends(tx, 'Alice', 'Bob'))
  .then(() => session3.readTransaction(findFriendships)
  .then(() => session3.close()));
});

last.then(data=>{
  console.log(data)
})