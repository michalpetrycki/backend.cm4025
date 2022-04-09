import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';

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
        this.router.get(`${this.path}`, this.getPosts);
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

    private getPosts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try{

            const posts = await this.PostService.getPosts();

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

}

export default PostController;
