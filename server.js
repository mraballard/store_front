// ==================================
// MODULES
// ==================================
var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var logger          = require('morgan');
var port            = 4000 || process.env.PORT;
var app             = express();

mongoose.Promise = global.Promise;

// create connect to store app db
mongoose.connect('mongodb://localhost/storeapp');

// ==================================
// MIDDLEWARE / CONFIGURATION
// ===================================
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('public'));

// =================================
// ROUTING MIDDLEWARE
// ==================================

app.listen(port, function(){
  console.log('=======================');
  console.log('Running on port ' + port);
  console.log('========================');
});

