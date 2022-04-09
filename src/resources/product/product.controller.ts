import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/product/product.validation';
import ProductService from '@/resources/product/product.service';
import authenticated from '@/middleware//authenticated.middleware';

// COntroller has to be added in index.ts in Controller array in constructor
class ProductController implements Controller {

    public path = '/products';
    public router = Router();
    private ProductService = new ProductService();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void{

        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(`${this.path}`, this.getProducts);

    }

    private create = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            
            const { authorId, content } = req.body;

            const post = await this.ProductService.create(authorId, content);

            res.status(201).json({ post });

        } 
        catch (error) {
            next(new HttpException(400, 'Cannot create post'));
        }
    }

    private getProducts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try{

            const products = await this.ProductService.getProducts();

            if (Array.isArray(products) && products.length > 0){

                // Status is ok 200 as nothing has been created
                res.status(200).json({ products });

            }
            else if (Array.isArray(products) && products.length === 0){

                // Status 204 - No content
                res.status(204).json()

            }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    }

}

export default ProductController;
