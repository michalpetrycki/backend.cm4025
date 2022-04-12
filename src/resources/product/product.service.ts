import ProductModel from '@/resources/product/product.model';
import Product from '@/resources/product/product.interface';

class ProductService {

    private product = ProductModel;

    /**
     * Create a new product
     */
    public async create(name: string, category: string, price: number, rating: number, quantity: number, inventoryStatus: string, imagePath: string): Promise<Product> {

        try {

            const product = await this.product.create({ name, category, price, rating, quantity, inventoryStatus, imagePath });
            return product;
            
        } 
        catch (error) {
            throw new Error('Unable to create product');
        }

    }

    /**
     * Update given product
    */
     public async update(_id: string, name: string, category: string, price: number, rating: number, quantity: number, inventoryStatus: string, imagePath: string): Promise<Product | null> {

        try {

            const product = await this.product.findOneAndUpdate({ _id: _id }, { $set: { name, category, price, rating, quantity, inventoryStatus, imagePath }}, { upsert: true, returnDocuemnt: 'after' });
            return product;
            
        } 
        catch (error) {
            throw new Error('Unable to update product');
        }

    }

    /**
     * Remove given product
    */
     public async delete(_id: string): Promise<Product | null> {

        try {
            const product = await this.product.findOneAndDelete({ _id: _id });
            return product;
        } 
        catch (error) {
            throw new Error('Unable to delete product');
        }

    }

    /**
     * Get product by id
    */
     public async get(_id: string): Promise<Product | null> {

        try {
            const product = await this.product.findById({ _id: _id });
            return product;
        } 
        catch (error) {
            throw new Error('Unable to create product');
        }

    }

    public async getAll(): Promise <Error | Product[]> {

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
