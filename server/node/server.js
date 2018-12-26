const bodyParser = require('body-parser'),
  express = require('express'),
  cors = require('cors')

const app = express()

//////////////////////////////////
//
//      Express SETUP
//
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// app.options('*', cors());

//////////////////////////////////
//
//      Routes
//
const routes = require('./routes');
routes(app) // register the routes

const port = process.env.PORT || 3030
app.listen(port, function () {
  console.log('Server started on port ' + port)
})
