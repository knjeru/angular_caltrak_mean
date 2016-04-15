var mongoose = require('mongoose-q')();
mongoose.connect('mongodb://localhost/caltrak');

var foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  servingSize: String,
  fat: Number,
  carbs: Number,
  protein: Number
});

module.exports = mongoose.model('Food', foodSchema);
