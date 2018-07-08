let express = require('express');
let mongoose = require('mongoose');
let Employee = mongoose.model('Employee');
let Team = mongoose.model('Team');
let router = express.Router();


router.get('/employees',function (req, res,next) {
    Employee.find().sort('name.last').exec(function(error,results){
        if (error){
            return next(error);
        }
        //respond with valid data
        res.json(results);
    });
});

router.get('/employees/:employeeId',function (req, res, next) {
    Employee.findOne({
        id: req.params.employeeId
    }).populate('team').exec(function (error, results) {
        if (error){
            return next(error);
        }

        //If valid user not found,send 404
        if (!results){
            return res.sendStatus(404);
        }

        //Respond with valid data
        res.json(results);
    });
});

router.put('/employees/:employeeId',function (req, res, next) {
    // Remove this or mongoose will throw an error
    // because we would be trying to update the mongo ID
    delete req.body._id;
    req.body.team = req.body.team._id;

    Employee.update({
        id: req.params.employeeId
    },req.body,function (error, numberAffected, response) {
        if (error){
            return next(error);
        }

        res.sendStatus(200);
    });
});

router.post('/employees',function (req, res, next) {
    let newEmployee = new Employee(req.body);

    newEmployee.save(function (error, employee) {
        if (error){
            return next(error);
        }
        res.json(employee);
    });
});

router.delete('/employees/:employeeId', function (req, res, next) {
    Employee.remove({
        id: req.params.employeeId
    }, function (error, results) {
        if (error){
            return next(error);
        }
        //respond with valid data
        res.json(results);
    });
});

module.exports = router;
