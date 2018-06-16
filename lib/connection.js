var mongoose = require('mongoose');
var dbUrl = 'mongodb://hrmapp:hrmapp001@ds255320.mlab.com:55320/heroku_1rvl5wrt';



mongoose.connect(dbUrl,function (error,db) {
    if (error) {
        console.log("error connecting to the database");
    }
});


// Close the Mongoose connection on Control+C
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    }); });

require('../models/employee');
require('../models/team');