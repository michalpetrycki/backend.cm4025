import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { Types } from 'mongoose';
import { collections } from './services/database.service';
import User from './models/user';
import { connectToDatabase } from "./services/database.service"

const app = express()
            .use(cors())
            .use(bodyParser.urlencoded({ extended: false }))
            .use(express.json());

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '../CM4025-frontend/dist/')));

connectToDatabase()
.then(() => {

    // Send index.html file to the user for the home page
    app.get('/', (req: Request, res: Response) => {

        res.sendFile(__dirname + '/index.html');
        console.log('something');

    });

    const adminRouter = express.Router();

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
    adminRouter.get('/users', async (req: Request, res: Response) => {

        try{

            const users = (await collections.users?.find({}).toArray()) as unknown[] as User[];

            res.status(200).send(users);

        }
        catch (error){
            let errorMesage = 'Failed to register user';
            if (error instanceof Error){
                errorMesage = error.message;
            }
            console.log(errorMesage);
            res.status(400).send(errorMesage);
        }


    });

    adminRouter.post('/register', async (req: Request, res: Response) => {

        try{

            const newUser = req.body as User;
            const result = await collections.users?.insertOne(newUser);

            console.log(newUser);
            console.log(result);

            result 
                ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
                : res.status(500).send(`Failed to register user.`);

        }
        catch (error){
            let errorMesage = 'Failed to register user';
            if (error instanceof Error){
                errorMesage = error.message;
            }
            console.log(errorMesage);
            res.status(400).send(errorMesage);
        }

    })

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


});
