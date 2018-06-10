let http = require('http');
let employeeService = require('./lib/employees');
let responder = require('./lib/responseGenerator');
let staticFile = responder.staticFile('./public');


http.createServer(function (req, res) {
    // A parsed url to work with in case there are parameters
    let _url;

    //Incase the client uses lower case for methods.
    req.method = req.method.toUpperCase();
    console.log(`${req.method} ${req.url}`);

    if (req.method!=='GET'){
        res.writeHead(501, {
            'Content-Type':'text/plain'
        });
        return res.end(`${req.method} is not implemented by this server`);
    }

    if (_url = /^\/employees$/i.exec(req.url)) {
        // return a list of employees
        employeeService.getEmployees(function (error, data) {
            if (error) {
                // send a 500 error
                return responder.send500(error,data);
            }
            // send the data with a 200 status code
            return responder.sendJson(data,res);
        });
    } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
        // find the employee by the id in the route
        employeeService.getEmployee(_url[1], function (error, data) {
            if (error) {
                // send a 500 error
                return responder.send500(error,data);
            }
            if (!data) {
// send a 404 error
                return responder.send404(res);
            }
            // send the data with a 200 status code
            return responder.sendJson(data,res)
        });
    } else {
        // try to send the static file if it exists,
        // if not, send a 404
        res.writeHead(200);
        res.end('static file maybe');
        //staticFile();
    }
}).listen(1337, '127.0.0.1');