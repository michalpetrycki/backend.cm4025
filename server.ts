import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';

const app = express();
const port = process.env.PORT || 8000;
const adminRouter = express.Router();

app.use(express.static(path.join(__dirname, '../CM4025-frontend/dist/')));
app.get('*', (req: Request, res: Response) =>{
    res.sendFile(path.join(__dirname, '../CM4025-frontend/dist/index.html'));
});

// Send index.html file to the user for the home page
app.get('/', (req: Request, res: Response) => {

    res.sendFile(__dirname + '/index.html');
    console.log('something');

});

// router middleware that will happen on every request
adminRouter.use(function(req: Request, res: Response, next: NextFunction){

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();

});

// admin main page. The dashboard (http://localhost:PORT/admin)
adminRouter.get('/', (req: Request, res: Response) => {
    res.send('I am the dashboard');
});

// users page (http://localhost/PORT/admin/users)
adminRouter.get('/users', (req: Request, res: Response) => {
    res.send('I show all the users');
});

// posts page (http://localhost/PORT/admin/posts)
adminRouter.get('/posts', (req: Request, res: Response) => {
    res.send('I show all the posts');
});

// route middleware to validate :name param
adminRouter.param('name', (req: Request, res: Response, next:  NextFunction, name: string) => {

    // do validation on name here
    // log something so we know its working
    console.log('doing name validation on: ' + name);

    // once validation is done save the new item in the req
    req.params['name'] = name;

    // go to the next thing
    next();

});

app.route('/login')
// show the form (GET http://localhost:PORT/login)
.get((req: Request, res: Response) => {
    console.log('get logn');
    res.send('this is the login form');
})
// process the form (POST http://localhost:PORT/login)
.post((req: Request, res: Response) => {
    console.log('processing');
    res.send('processing the login form');
});

adminRouter.get('/users/:name', (req: Request, res: Response) => {
    res.send('Hello ' + req.params.name + '!');
});

app.use('/admin', adminRouter);

// Start the server 
app.listen(port);
console.log('Express server is running at 127.0.0.1:' + port);
