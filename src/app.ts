import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';
import Controller from '@/utils/interfaces/controller.interface';
import SeedDatabase from './utils/seed.database';

class App{
    
    public express: Application;
    public port: number;
    private seed: SeedDatabase;

    constructor(controllers: Controller[], port: number){

        this.express = express();
        this.port = port;
        this.seed = new SeedDatabase();

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();

        if (process.env.NODE_ENV === 'development'){
            this.seedDatabase();
        }
        
    }

    private initializeMiddleware(): void{

        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());

    }

    private initializeControllers(controllers: Controller[]): void{

        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });

    }

    private initializeErrorHandling(): void{

        this.express.use(ErrorMiddleware);

    }

    private initializeDatabaseConnection(): void{

        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        console.log(`connecting to: ${MONGO_PATH}`);
        console.log('asss');

        mongoose.connect(
            // AtlasDB
            // `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
            // Local DB
            `mongodb://${MONGO_PATH}`
            ,
            {
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000
            }
        )
        .then(() => {
            console.log('connected to database');
        })
        .catch((error) => {
            console.log('error during connecting to database: error =>' + error);
        });

    }

    public listen(): void{

        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });

    }

    private seedDatabase(): void {
        this.seed.insertUsers();
    }

}

export default App;
