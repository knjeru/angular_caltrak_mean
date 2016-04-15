var express = require('express');
var router = express.Router();
var Food = require('../models/foodModel.js');

// Get All Foods
router.get('/', function(req,res,next) {
   Food.find()
   .then(function(data) {
       res.status(200)
          .json(data);
   })
   .catch(function(err) {
       res.status(500)
          .json({message: err});
   });
});

router.get('/:id', function(req,res,next) {
    Food.findByIdQ(req.params.id)
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
    new Food({
        name: req.body.name,
        calories: req.body.calories,
        servingSize: req.body.servingsize,
        fat: req.body.fat,
        carbs: req.body.carbs,
        protein: req.body.protein
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
    Food.findByIdQ(req.params.id)
    .then(function(food) {
        food.name = req.body.name;
        food.calories = req.body.calories;
        food.servingSize = req.body.servingSize;
        food.fat = req.body.fat;
        food.carbs = req.body.carbs;
        food.protein = req.body.protein;
        food
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
        res.status(500)
        .json({message: err});
    });
});

router.delete('/:id/delete', function(req,res,next) {
    User.findByIdAndRemoveQ(req.params.id)
    .then(function(data) {
        res.status(200)
           .json(data);
    })
    .catch(function(err) {
        res.status(500)
           .json({message: err})
    })
})


module.exports = router;