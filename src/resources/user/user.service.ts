import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import User from './user.interface';

class UserService{
    
    private user = UserModel;

    /**
     * Register a new user
     */
    public async register(username: string, email: string, password: string, role: string): Promise<Error | string>{
        
        try {

            const user = await this.user.create({ username, email, password, role });

            const accessToken = token.createToken(user);

            return accessToken;

        } 
        catch (error: any) {
            throw new Error(`Unable to create user.\ Error: ${error.message}`);
        }

    }

    /**
     * Attempt to login a user
     */
    public async login(email: string, password: string): Promise<Error | string>{
        try {
            
            const newUser = await this.user.findOne({ email });

            if (!newUser){
                throw new Error('Unable to find user with that Email Address');
            }

            if (await newUser.isValidPassword(password)){
                return token.createToken(newUser);
            }
            else{
                throw new Error('Wrong credentials given');
            }

        } 
        catch (error) {
            throw new Error('Unable to login user. ' + error);
        }
    }

    public async getUsers(): Promise <Error | User[]>{

        try{

            const users = await this.user.find({});
            return users;

        }
        catch (error){
            throw new Error('Unable to get users');
        }

    };

}

export default UserService;
