var mongoose = require('mongoose');

var OrderItemSchema = require('./orderItem').schema;
OrderItemSchema.virtual('subtotal').get(function(){
  return this.quantity * this.product.price;
})

var OrderSchema = new mongoose.Schema({
  items: [OrderItemSchema],
  createdAt: Date,
  updatedAt: Date
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});
OrderSchema.virtual('total').get(function(){
  return this.items.map(function(item) {
    return item.subtotal;
  }).reduce(function(m, e){ return m + e; },0);
});
OrderSchema.pre('save', function(next){
  if (!this.createdAt) { this.createdAt = new Date(); }
  this.updatedAt = new Date();
  next();
})

module.exports = mongoose.model('Order', OrderSchema);
