import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';
import Controller from '@/utils/interfaces/controller.interface';

class App{
    
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number){

        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();

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

        console.log(`Im connecting to ===mongodb://${MONGO_PATH}`);
        
        mongoose.connect(
            // `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
            `mongodb://${MONGO_PATH}`
        );

    }

    public listen(): void{

        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });

    }

}

export default App;
