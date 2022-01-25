// Load the express package and create our app
var express = require('express');
var app = express();

const PORT = process.env.PORT || 8080;

// Set the port based on environment
var port = PORT;

// Send index.html file to the user for the home page
app.get('/', function(req, res){

    res.sendFile(__dirname + '/index.html');

});

// Create routes for the admin section
// get an instance of the router
var adminRouter = express.Router();

// router middleware that will happen on every request
adminRouter.use(function(req, res, next){

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();

});

// admin main page. The dashboard (http://localhost:PORT/admin)
adminRouter.get('/', function(req, res){
    res.send('I am the dashboard');
});

// users page (http://localhost/PORT/admin/users)
adminRouter.get('/users', function(req, res){
    res.send('I show all the users');
});

// posts page (http://localhost/PORT/admin/posts)
adminRouter.get('/posts', function(req, res){
    res.send('I show all the posts');
});

// route middleware to validate :name param
adminRouter.param('name', function(req, res, next, name){

    // do validation on name here
    // log something so we know its working
    console.log('doing name validation on: ' + name);

    // once validation is done save the new item in the req
    req.name = name;

    // go to the next thing
    next();

});

app.route('/login')
// show the form (GET http://localhost:PORT/login)
.get(function(req, res){
    console.log('get logn');
    res.send('this is the login form');
})
// process the form (POST http://localhost:PORT/login)
.post(function(req, res){
    console.log('processing');
    res.send('processing the login form');
});



adminRouter.get('/users/:name', function(req, res){
    res.send('Hello ' + req.params.name + '!');
});

app.use('/admin', adminRouter);

// Start the server 
app.listen(port);
console.log('Express server is running at 127.0.0.1:' + PORT);