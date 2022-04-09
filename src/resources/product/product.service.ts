import ProductModel from '@/resources/product/product.model';
import Product from '@/resources/product/product.interface';

class ProductService {

    private product = ProductModel;

    /**
     * Create a new product
     */
    public async create(authorId: string, content: string): Promise<Product> {

        try {

            const product = await this.product.create({ title: 'abcd', authorId, content });

            return product;
            
        } 
        catch (error) {
            throw new Error('Unable to create product');
        }

    }

    public async getProducts(): Promise <Error | Product[]> {

        try{

            const products = await this.product.find({});
            return products;

        }
        catch (error){
            throw new Error('Unable to get products');
        }

    };

}

export default ProductService;
