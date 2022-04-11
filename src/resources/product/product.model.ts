import { Schema, model } from 'mongoose';
import Product from '@/resources/product/product.interface';

const ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    inventoryStatus: {
        type: String,
        required: false
    }

}, { timestamps: true });

export default model<Product>('Product', ProductSchema);
