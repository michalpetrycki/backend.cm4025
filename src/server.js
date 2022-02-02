"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path = __importStar(require("path"));
const bodyParser = __importStar(require("body-parser"));
const database_service_1 = require("./services/database.service");
const database_service_2 = require("./services/database.service");
const app = (0, express_1.default)()
    .use((0, cors_1.default)())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(express_1.default.json());
const port = process.env.PORT || 8000;
app.use(express_1.default.static(path.join(__dirname, '../CM4025-frontend/dist/')));
(0, database_service_2.connectToDatabase)()
    .then(() => {
    // Send index.html file to the user for the home page
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
        console.log('something');
    });
    const adminRouter = express_1.default.Router();
    // router middleware that will happen on every request
    adminRouter.use(function (req, res, next) {
        // log each request to the console
        console.log(req.method, req.url);
        // continue doing what we were doing and go to the route
        next();
    });
    // admin main page. The dashboard (http://localhost:PORT/admin)
    adminRouter.get('/', (req, res) => {
        res.send('I am the dashboard');
    });
    // users page (http://localhost/PORT/admin/users)
    adminRouter.get('/users', async (req, res) => {
        try {
            const users = (await database_service_1.collections.users?.find({}).toArray());
            res.status(200).send(users);
        }
        catch (error) {
            let errorMesage = 'Failed to register user';
            if (error instanceof Error) {
                errorMesage = error.message;
            }
            console.log(errorMesage);
            res.status(400).send(errorMesage);
        }
    });
    adminRouter.post('/register', async (req, res) => {
        try {
            const newUser = req.body;
            const result = await database_service_1.collections.users?.insertOne(newUser);
            console.log(newUser);
            console.log(result);
            result
                ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
                : res.status(500).send(`Failed to register user.`);
        }
        catch (error) {
            let errorMesage = 'Failed to register user';
            if (error instanceof Error) {
                errorMesage = error.message;
            }
            console.log(errorMesage);
            res.status(400).send(errorMesage);
        }
    });
    // posts page (http://localhost/PORT/admin/posts)
    adminRouter.get('/posts', (req, res) => {
        res.send('I show all the posts');
    });
    // route middleware to validate :name param
    adminRouter.param('name', (req, res, next, name) => {
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
        .get((req, res) => {
        console.log('get logn');
        res.send('this is the login form');
    })
        // process the form (POST http://localhost:PORT/login)
        .post((req, res) => {
        console.log('processing');
        res.send('processing the login form');
    });
    adminRouter.get('/users/:name', (req, res) => {
        res.send('Hello ' + req.params.name + '!');
    });
    app.use('/admin', adminRouter);
    // Start the server 
    app.listen(port);
    console.log('Express server is running at 127.0.0.1:' + port);
});
