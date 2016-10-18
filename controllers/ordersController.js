var express = require('express'),
    router  = express.Router();

var Product = require('../models/product');
var Order = require('../models/order');

//Authorize User before showing them products
var authorize = function(req,res,next){
  if(!req.user){
    res.json(401, 'unauthorized')
  }
  else{
    next()
  }
}
router.get('/',authorize,function(req, res){
  Order.find({}).exec()
  .then(function(orders){
    console.log(orders);
    res.json(orders);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

router.post('/', function(req, res){
  console.log("req.body", req.body.order);
  Order.create(req.body.order)
  .then(function(order){
    console.log(order);
    res.json(order);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

router.get('/:id', function(req, res){
  Order.findById(req.params.id).exec()
  .then(function(order){
    console.log(order);
    res.json(order);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
