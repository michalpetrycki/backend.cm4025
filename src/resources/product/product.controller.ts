import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/product/product.validation';
import ProductService from '@/resources/product/product.service';
import authenticated from '@/middleware//authenticated.middleware';
import { isValidObjectId } from 'mongoose';

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
        this.router.get(`${this.path}`, this.getAll);
        this.router.patch(`${this.path}`, this.update);
        this.router.delete(`${this.path}`, this.delete);

    }

    private create = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            
            const { name, category, price, rating, quantity, inventoryStatus } = req.body;

            const product = await this.ProductService.create(name, category, price, rating, quantity, inventoryStatus);

            res.status(201).json({ product });

        } 
        catch (error) {
            next(new HttpException(400, 'Cannot create product'));
        }
    }

    private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try{

            const products = await this.ProductService.getAll();

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

    private update = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            
            const { _id, name, category, price, rating, quantity, inventoryStatus } = req.body;

            const post = await this.ProductService.update(_id, name, category, price, rating, quantity, inventoryStatus);

            res.status(201).json({ post });

        } 
        catch (error) {
            next(new HttpException(400, 'Cannot update post'));
        }
    }

    private delete = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const { _id } = req.body;

            if (isValidObjectId(_id)){

                const deletedProduct = await this.ProductService.delete(_id);
                
                if (deletedProduct){

                    // For delete use 200 (OK) or 204 (no content success - recommended)
                    res.status(204).json();

                }
                else {

                    // Nothing with that id found - no resource
                    res.status(404);

                }
             
            }
            else{

                const post = await this.ProductService.get(_id);

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

export default ProductController;
