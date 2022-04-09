import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

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

    public async getPosts(): Promise <Error | Post[]> {

        try{

            const posts = await this.post.find({});
            return posts;

        }
        catch (error){
            throw new Error('Unable to get posts');
        }

    };

}

export default PostService;
