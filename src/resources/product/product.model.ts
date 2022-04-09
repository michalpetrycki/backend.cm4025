import { Schema, model } from 'mongoose';
import Product from '@/resources/product/product.interface';

const ProductSchema = new Schema({

    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }

}, { timestamps: true });

export default model<Product>('Product', ProductSchema);
