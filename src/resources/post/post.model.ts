import { Schema, model } from 'mongoose';
import Post from '@/resources/post/post.interface';

const PostSchema = new Schema({

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

export default model<Post>('Post', PostSchema);
