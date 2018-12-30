const appDbName = 'lyrics'
    , isEqualNoOrder = require('../js-utils/array').isEqualNoOrder
      ;
const { connectionSettings } = require('../db');

const knex = require('knex')({
  client: 'mysql',
  connection: connectionSettings
});

const MAX_LENGTH = 1000;

/**
 * Create a mysql like query.
 *
 * @param {MySql.pool} pool - WIKI: is a cache of database connections maintained so that the connections can be reused when future requests to the database are required.
 * @param {String} sql - MySql like query
 */
const createQuery = (pool, sql) => {
  return new Promise ((resolve, reject) => {
    pool.query(sql, function(err, results, fields) {
      if (err) reject(err);
      else resolve({ results, fields });
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

createTable = (pool, tableName, schemaArray=[]) => {
  const colums = schemaArray
    .map(schema => `${schema} VARCHAR(${MAX_LENGTH})`)
    .join(', ');

  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${colums})`;
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
 * @param {Object} pool
 * @param {Object} entryOptions
 *  @prop {string<JSON>} value
 *  @prop {string} columnName
 *  @prop {string} tableName
 */
exports.getEntryByColumn = (pool, { value, columnName, tableName }) => {
  value = JSON.parse(value);
	console.log("​exports.getEntryByColumn -> value", value)
  value = value.join(' ');

  return knex(tableName)
  .where(columnName, '=', value)
  .then(data => {
    if (data.length === 0) throw new Error(`No entry for ${value} found`)
    return data;
  })
  .catch(err => err);
}

/**
 * @param {Object}
 * @prop {string} id
 * @prop {string} tableName
 */
exports.getEntry = ({id, tableName}) => {
  return knex(tableName)
  .where('id', '=', id)
  .then(data => {
    return data;
  })
  .catch(err => err);
}

/**
 * NOTE that mysql insert arrays of strings as just string
 * ['a', 'b'] -> a b
 * @param {MySql.pool} pool - WIKI: is a cache of database connections maintained so that the connections can be reused when future requests to the database are required.
 * @param {String} tableName
 * @param {Object} data
 */
exports.singleInsertInto = (pool, tableName, data) => {
  return knex(tableName)
  .insert(data.translation)
  .then(res => res)
  .catch(err => err);
}

/**
 * @param {} pool
 * @param {Object}
 *  @prop {string} tableName
 *  @prop {Object} data
 *  @prop {string<JSON>} value
 *  @prop {string} columnName
 */
exports.updateRowByColumn = (pool, {tableName, data, value, columnName}) => {
  value = JSON.parse(value);
  value = value.join(' ');
  return knex(tableName)
    .where(columnName, '=', value)
    .update(data)
    .then(data => data)
    .catch(err => err);
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

exports.listTable = (pool, tableName) => {
  const query = `SELECT * FROM ${tableName}`;
  return createQuery(pool, query)
    .then(response => response)
    .catch(err => console.error(err));
}

// DEBUGGING SECTION
// const tableName = 'lyricTest';
// db.connect
// .then(pool => {
//   // createTable(pool, tableName, [
//   //   `original`,
//   //   `translation`
//   // ])
//   singleInsertInto(pool, tableName, {
//     original: 'orign',
//     translation: 'trans',
//   })
//   // .catch(err => console.error(err));
// })
// db.connect
//   .then ( pool => {
//     // createTable(pool, 'sayings', [
//     //   'greeting VARCHAR(20) NOT NULL',
//     //   'parting VARCHAR(20) NOT NULL'
//     // ])
//     singleInsertInto(pool, "sayings", {
//       greeting: "hi",
//       parting: 'bye'
//     })
//       .then( response => {
//         console.log(response.results);
//       })
//       .catch(err => {throw new Error(err)});
//   })
//   .catch( err => console.log(err));
