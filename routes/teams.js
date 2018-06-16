let express = require('express');
let mongoose = require('mongoose');
let Employee = mongoose.model('Employee');
let Team = mongoose.model('Team');
let router = express.Router();


router.get('/teams',function (req, res, next) {
    Team.find().sort('name').exec(function (error,results) {
        if (error){
            return next(error);
        }

        //Respond with valid data
        res.json(results);
    });
});


router.get('/teams/:teamId',function (req, res, next) {
    Team.findOne({
        _id: req.params.teamId
    },function (error,results) {
        if (error){
            return next(error);
        }

        res.json(results);
    });
});

module.exports = router;