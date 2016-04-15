var express = require('express');
var router = express.Router();
var User = require('../models/userModel.js');

router.get('/', function(req,res,next) {
    User.find()
    .then(function(data) {
        res.status(200)
           .json(data);
    })
    .catch(function(err) {
        res.statsu(500)
           .json({message: err});
    });
});

router.get('/:id', function(req,res,next) {
    User.findByIdQ(req.params.id)
    .then(function(data) {
        res.status(200)
           .json(data);
    })
    .catch(function(err) {
        res.status(500)
           .json({message: err});
    });
});

router.post('/', function(req,res,next) {
    new User({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        activityLevel: req.body.activityLevel,
        weight: {
            weight: req.body.weight
        }
    })
    .saveQ()
    .then(function(data) {
        res.status(200)
           .json(data);
    })
    .catch(function(err) {
        res.status(500)
           .json({message: err});
    });
});

router.put('/:id/edit', function(req,res,next) {
    User.findByIdQ(req.params.id)
    .then(function(user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.activityLevel = req.body.activityLevel;
        user.weight = {
            weight: req.body.weight
        }
        user
        .saveQ()
        .then(function(data) {
            res.status(200)
               .json(data);
        })
        .catch(function(err) {
            res.status(500)
               .json({message: err});
        });
    })
    .catch(function(err) {
        res.status(200)
           .json({message: err});
    });
});

router.post('/:id/weight/new', function(req,res,next) {
    User.findByIdAndUpdate(req.params.id, 
    {
        $push: {
            "weight": {
                weight: req.body.weight
            }
        }
    },
    {safe: true, upsert: true, new: true},
    function(err, user) {
        if (err) {
            res.status(500)
               .json({message: err});
        } else {
            res.json(user);
        }
    });
});

router.post('/:id/calories/new', function(req,res,next) {
    User.findByIdAndUpdate(req.params.id,
    {
        $push: {
            "food": {
                name: req.body.name,
                calories: req.body.calories
            }
        }
    },
    {safe: true, upsert: true, new: true},
    function(err, food) {
        if(err) {
            res.status(500)
               .json({message: err});
        } else {
            res.json(user);
        }
    });
});

router.delete('/:id/weight/new', function(req,res,next) {
    User.findByIdAndUpdate(req.params.id,
    {
        $pull: {
            "weight": {
                _id: req.body._id
            }
        }
    },
    {multi: false},
    function(err, user) {
      if (err) {
        res.json({
          status: 500,
          message: err
        });
      } else {
          res.json(user);
      }
    });
});

router.delete('/:id/food/delete', function(req,res,next) {
    User.findByIdAndUpdate(req.params.id,
    {
        $pull: {
            "food": {
                _id: req.body._id
            }
        }
    },
    {multi: false},
    function(err, user) {
      if (err) {
        res.json({
          status: 500,
          message: err
        });
      } else {
          res.json(user);
      }
    });
});

router.delete('/:id/delete', function(req,res,next) {
    User.findByIdAndRemoveQ(req.params.id)
    .then(function(data) {
        res.status(200)
           .json(data)
    })
    .catch(function(err) {
        res.status(200)
           .json({message: err});
    });
});

module.exports = router;