import { Document } from 'mongoose';

export default interface Product extends Document {
    name: string;
    category: string;
    price: string;
    imagePath: string;
}
