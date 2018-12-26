const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const routes = require('./mysql-routes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

db.connect.then(pool => routes(app, pool)) // register the routes

const port = 3131;
app.listen(port, () => {
  console.log('Mysql server started on port ' + port);
})