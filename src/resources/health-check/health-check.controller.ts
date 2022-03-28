import Controller from '@/utils/interfaces/controller.interface';
import { Router, Request, Response, NextFunction } from 'express';

class HealthCheckController implements Controller{

    public path = '/health';
    public router = Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void{

        this.router.get(`${this.path}`, this.getHealthCheckData);

    }

    private getHealthCheckData = (req: Request, res: Response, next: NextFunction): Response | void => {

        const data = {
            uptime: process.uptime(),
            message: 'Ok',
            date: new Date()
        };

        res.status(200).json({ data });

    };

}

export default HealthCheckController;
