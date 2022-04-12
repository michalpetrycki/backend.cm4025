import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware//authenticated.middleware';

// COntroller has to be added in index.ts in Controller array in constructor
class UserController implements Controller {

    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void{

        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );

        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );

        this.router.get(`${this.path}/current`, authenticated, this.getUser);
        this.router.get(`${this.path}`, authenticated, this.getUsers);
        this.router.patch(`${this.path}`, authenticated, this.update);

    }

    private register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        
        try {
        
            const { username, email, password, role } = req.body;

            const token = await this.UserService.register(username, email, password, role);

            // 201 if something is created
            res.status(201).json({ token });
            
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    }

    private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { email, password } = req.body;

            const token = await this.UserService.login(email, password);

            // Status is ok 200 as nothing has been created
            res.status(200).json({ token });
            
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    }

    private getUser = (req: Request, res: Response, next: NextFunction): Response | void => {

        if (!req.user){
            return next(new HttpException(404, 'No logged in user'));
        }

        res.status(200).json({ user: req.user });

    }

    private getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try{

            const users = await this.UserService.getUsers();

            if (Array.isArray(users) && users.length > 0){

                // Status is ok 200 as nothing has been created
                res.status(200).json({ users });

            }
            else if (Array.isArray(users) && users.length === 0){

                // Status 204 - No content
                res.status(204).json()

            }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    }

    private update = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            
            const { _id, propertyToEdit1, propertyToEdit2, propertyToEdit3, propertyToEdit4, imageUrl } = req.body;
            const user = await this.UserService.update(_id, propertyToEdit1, propertyToEdit2, propertyToEdit3, propertyToEdit4, imageUrl);

            res.status(200).json({ user });

        } 
        catch (error) {
            next(new HttpException(400, 'Cannot update user'));
        }
    }

}

export default UserController;
