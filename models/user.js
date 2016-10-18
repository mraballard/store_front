var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = require('../models/orderitem');
var productSchema = require('../models/product.js');
var orderItem = require('../models/orderitem.js');
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
