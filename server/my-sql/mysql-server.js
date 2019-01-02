const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const routes = require('./mysql-routes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


db.connect.then(pool => routes(app, pool)) // register the routes with mysql instance.

const port = 3131;
app.listen(port, () => {
  console.log('Mysql server started on port ' + port);
})