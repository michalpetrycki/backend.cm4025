import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';
import authenticated from '@/middleware//authenticated.middleware';
import { isValidObjectId } from 'mongoose';

class PostController implements Controller {

    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(`${this.path}`, this.getAll);
        this.router.patch(`${this.path}`, authenticated, this.update);
        this.router.delete(`${this.path}`, authenticated, this.delete);
    }

    private create = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            
            const { authorId, content } = req.body;

            const post = await this.PostService.create(authorId, content);

            res.status(201).json({ post });

        } 
        catch (error) {
            next(new HttpException(400, 'Cannot create post'));
        }
    }

    private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try{

            const posts = await this.PostService.getAll();

            if (Array.isArray(posts) && posts.length > 0){

                // Status is ok 200 as nothing has been created
                res.status(200).json({ posts });

            }
            else if (Array.isArray(posts) && posts.length === 0){

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
            
            const { _id, title, authorId, content } = req.body;

            const post = await this.PostService.update(_id, title, authorId, content);

            res.status(200).json({ post });

        } 
        catch (error) {
            next(new HttpException(400, 'Cannot update post'));
        }
    }

    private delete = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const { _id } = req.body;

            if (isValidObjectId(_id)){

                const deletedPost = await this.PostService.delete(_id);
                
                if (deletedPost){

                    // For delete use 200 (OK) or 204 (no content success - recommended)
                    res.status(204).json();

                }
                else {

                    // Nothing with that id found - no resource
                    res.status(404);

                }
             
            }
            else{

                const post = await this.PostService.get(_id);

                // If object with given id exists
                if (post){

                    // Badrequest - as there's an issues with passed _id property
                    res.status(400);

                }
                else {

                    // Nothing with that id found - no resource
                    res.status(404);

                }

            }

        } 
        catch (error) {
            next(new HttpException(400, 'Cannot delete post'));
        }
    }

}

export default PostController;
