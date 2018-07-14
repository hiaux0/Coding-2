const bodyParser = require('body-parser'),
      express = require('express'),
      mysql = require('mysql'),
      async = require('async');


// Init express
const app = express();

// Configure Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connectionSettings = {
  host: 'localhost',
  user: 'hdn', 
  password: "moti",
  database: 'list_mapper'
}


const state = {
  pool: null // To get the state of connection?
}

/**
 * Promise for successful connection to mysql.
 */
exports.connect = new Promise( (resolve, reject) => {
  // Is it redundant to create a connection AND a Pool?
  const connection = mysql.createConnection(connectionSettings);
  connection.connect(function (err) {
    if (err) 
      reject(err);
    else {
      console.log(`MySql connection success. -- Connected to ${connectionSettings.database}`);
      resolve(mysql.createPool(connectionSettings));
    }
  })
})

exports.get = function() {
  return state.pool;
}

/**
 * Check if Pool is available, if it is
 * 
 * @return {Pool} pool
 *  ..else @return {Error} error
 */
const checkPool = function() {
  return state.pool ? 
      state.pool
    : done(new Error('Missing database connection.'))
}

/**
 * 
 * @param {Object} data 
 */
exports.fixtures = function (data, done) {
  var pool = checkPool();

  var names = Object.keys(data.tables)
  async.each(names, function (name, cb) {
    async.each(data.tables[name], function (row, cb) {
      var keys = Object.keys(row) 
      , values = keys.map(function (key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function (tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function (name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}