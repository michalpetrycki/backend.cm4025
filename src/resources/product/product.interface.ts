import { Document } from 'mongoose';

export default interface Product extends Document {
    title: string;
    authorId: string;
    content: string;
}
