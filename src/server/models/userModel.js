var mongoose = require('mongoose-q')();
mongoose.connect('mongodb://localhost/caltrak');

var userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  activityLevel: {
    type: Number,
    required: true
  },
  weight: [
    {
      timestamp: {
        type: Date,
        default: Date.now()
      },
      weight: Number
    }
  ],
  food: [
    {
      timestamp: {
        type: Date,
        default: Date.now()
      },
      name: {
        type: String,
        required: true
      },
      calories: {
        type: Number,
        required: true
      }
    }
  ]
});


module.exports = mongoose.model('User', userSchema);
