var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api', function (req, res, next) {
    setTimeout(function () {
        res.locals.users = [{
            first: 'David',
            last: 'Tejumola'
        }, {
            first: 'Temidayo',
            last: 'Adefioye'
        }];
        return next();
    }, 1000)
}, function (req, res, next) {
    res.locals.time = Date.now();
    res.set({'X-Special-Header': 'MEAN Stack'});

    let view = `<!DOCTYPE html><html lang="en"><head><link rel="stylesheet" href="/stylesheets/style.css")
                <body><h1>User Output</h1><table>`;

    for (let i = 0, length = res.locals.users.length; i < length; i++) {
        let user = res.locals.users[i];
        view += `<tr><td>${user.first}</td><td> ${user.last}</td></tr>`;
    }

    view += '</table></body></html>';
    res.send(view);
});


module.exports = router;
