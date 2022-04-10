import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';
import { isValidObjectId } from 'mongoose';
import { resolve } from 'path';

class PostService{

    private post = PostModel;

    /**
     * Create a new post
    */
    public async create(authorId: string, content: string): Promise<Post> {

        try {

            const post = await this.post.create({ title: 'abcd', authorId, content });

            return post;
            
        } 
        catch (error) {
            throw new Error('Unable to create post');
        }

    }

    /**
     * Update given post
    */
     public async update(_id: string, title: string, authorId: string, content: string): Promise<Post | null> {

        try {

            const post = await this.post.findOneAndUpdate({ _id: _id }, { $set: { title, authorId, content }}, { upsert: true, returnDocuemnt: 'after' });

            return post;
            
        } 
        catch (error) {
            throw new Error('Unable to update post');
        }

    }

    /**
     * Remove given post
    */
     public async delete(_id: string): Promise<Post | null> {

        try {
            const post = await this.post.findOneAndDelete({ _id: _id });
            return post;
        } 
        catch (error) {
            throw new Error('Unable to delete post');
        }

    }

    /**
     * Get post by id
    */
     public async get(_id: string): Promise<Post | null> {

        try {
            const post = await this.post.findById({ _id: _id });
            return post;
        } 
        catch (error) {
            throw new Error('Unable to create post');
        }

    }

    /**
     * Get all posts
    */
    public async getAll(): Promise <Error | Post[]> {

        try{

            const posts = await this.post.find({});
            return posts;

        }
        catch (error){
            throw new Error('Unable to get posts');
        }

    }

}

export default PostService;
