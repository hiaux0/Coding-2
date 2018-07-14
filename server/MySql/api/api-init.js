const db = require('../db')
      ;

const appDbName = 'list_mapper'
    , isEqualNoOrder = require('../js-utils/array').isEqualNoOrder
      ;

/**
 * Create a mysql like query.
 * 
 * @param {MySql.pool} pool - WIKI: is a cache of database connections maintained so that the connections can be reused when future requests to the database are required.
 * @param {String} sql - MySql like query
 */
const createQuery = (pool, sql) => {
  return new Promise ((resolve, reject) => {
    pool.query(sql, function(err, results, fields) {
      if (err) 
        return reject(err);
      else 
        resolve({ results, fields });
    });
  });
}

/**
 * Get the schema of a table. Also remove the id field, since it will be in every schema.
 * 
 * @param {MySql.pool} pool - WIKI: is a cache of database connections maintained so that the
 *  connections can be reused when future requests to the database are required.
 * @param {String} tableName
 */
const getSchema = (pool, tableName) => {
  let sql = `
    SELECT COLUMN_NAME 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = '${appDbName}' 
    AND TABLE_NAME = '${tableName}';
  `;
  return createQuery(pool, sql)
    .then(response => {
      let objectKey = Object.keys(response.results[0])[0];
      let arrayOfSchemaKeys = response.results.map(schemaKey => schemaKey[objectKey])
                                              .filter(schemaKey => schemaKey !== 'id');
      return arrayOfSchemaKeys;
    })
    .catch(err => {throw err});
}

/**
 * Use provided database name.
 * NOTE: Since we are connecting to a specific db, it makes no sense to connect to it again.
 * 
 * @param {MySql.pool} pool - WIKI: is a cache of database connections maintained so that the connections can be reused when future requests to the database are required.
 * @param {String} databaseName - Name of the database.
 */
exports.useDatabase = (pool, databaseName) => {
  let sql = `USE ${databaseName}`;
  return createQuery(pool, sql)
    .then(response => response)
    .catch(err => { throw new Error(err) });
}

/**
 * Show all tables in a database.
 * 
 * @param {MySql.pool} pool - WIKI: is a cache of database connections maintained so that the
 *  connections can be reused when future requests to the database are required.
 */
const showTables = (pool) => {
  let sql = `SHOW TABLES;`;
  pool.query(sql);
  return createQuery(pool, sql)
    .then(response => response)
    .catch(err => { throw new Error(err) });
}

/**
 * Create a mysql query to create a table.
 * 
 * @param {MySql.pool} pool - WIKI: is a cache of database connections maintained so that the connections can be reused when future requests to the database are required.
 * @param {String} tableName
 * @param {Array} schemaArray
 */

createTable = (pool, tableName, schemaArray="") => {
  let schema = schemaArray.join();
  let sql = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY(id), AUTO_INCREMENT = 1
  , ${schema}
  , PRIMARY KEY(id)
    );`;
  return createQuery(pool, sql)
    .then(response => response)
    .catch(err => {throw new Error(err)});
}

/**
 * Show all tables in a database.
 *
 * @param {MySql.pool} pool - WIKI: is a cache of database connections maintained so that the
 *  connections can be reused when future requests to the database are required. 
 * @param {String} tableName  
 */
describeTable = (pool, tableName) => {
  let sql = `DESCIRBE ${tableName}`;
  pool.query(sql);
  return createQuery(pool, sql)
    .then(response => response)
    .catch(err => {throw new Error(err)});
}

/**
 * Check if data satisfies the schema.
 * 
 * @param {Array.String} schema - An array of schema keys
 * @param {Object} data 
 */
const schemaValidation = (schema, data) => {
  let schemaKeysInData = Object.keys(data);
  return isEqualNoOrder(schema, schemaKeysInData);
}

/**
 * 
 * @param {MySql.pool} pool - WIKI: is a cache of database connections maintained so that the connections can be reused when future requests to the database are required.
 * @param {String} tableName
 * @param {Object} data 
 */
singleInsertInto = (pool, tableName, data) => {
  getSchema(pool, tableName)
    .then (schema => schemaValidation(schema, data))
    // TODONOW: Refactor and try to and get the promise value via "flatMap" from Bacon.js
    .then (isValidData => {
      if (isValidData) {
        let dataKeys = Object.keys(data).join();
        let dataValues = Object.values(data).join("','");
        let sql = 
          ` INSERT INTO ${tableName}
          (${dataKeys})
          VALUES
          ('${dataValues}');
          `;
        return createQuery(pool, sql)
          .then(response => response)
          .catch(err => { throw new Error(err) });
      } else 
        throw new Error(`Schema validation failed.`);
    })
    .catch(err => {throw err});
}

/**
 * Drop a table in the database.
 * 
 * @param {MySql.pool} pool - WIKI: is a cache of database connections maintained so that the connections can be reused when future requests to the database are required.
 * @param {String} tableName
 */
exports.dropTable = (pool, tableName) => {
  let sql = `DROP TABLE ${tableName}`;
  pool.query(sql);
  return createQuery(pool, sql)
    .then(response => response)
    .catch(err => { throw new Error(err) });
}

// DEBUGGING SECTION
db.connect
  .then ( pool => {
    // createTable(pool, 'sayings', [
    //   'greeting VARCHAR(20) NOT NULL',
    //   'parting VARCHAR(20) NOT NULL'
    // ])
    singleInsertInto(pool, "sayings", {
      greeting: "hi",
      parting: 'bye'
    })
      .then( response => {
        console.log(response.results);
      })
      .catch(err => {throw new Error(err)});
  })
  .catch( err => console.log(err));
