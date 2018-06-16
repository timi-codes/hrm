let mongoose = require('mongoose');
let postFind = require('mongoose-post-find');
let async = require('async');
let Schema = mongoose.Schema;

let TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    }, members: {
        type: [Schema.Types.Mixed]
    }
});

function _attachMembers(Employee, result, callback) {
    Employee.find({
        team: result._id
    }, function (error, employees) {
        if (error) {
            return callback(error);
        }
        result.members = employees;
        callback(null, result);
    });
}

//listen for find and findOne
TeamSchema.plugin(postFind, {
    find: function (result, callback) {
        let Employee = mongoose.model('Employee');

        async.each(result, function (item, callback) {
            _attachMembers(Employee, item, callback);
        }, function (error) {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    findOne: function (result, callback) {
        let Employee = mongoose.model('Employee');
        _attachMembers(Employee, result, callback);
    }
});

module.exports = mongoose.model('Team', TeamSchema);