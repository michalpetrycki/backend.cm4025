import UserSeed from '../seed/interfaces/user.seed.interface';
import Users from '../seed/data/user.seed.data';
import UserService from '@/resources/user/user.service';
import userModel from '@/resources/user/user.model';

class SeedDatabase{

    private userService = new UserService();
    private userModel = userModel;

    constructor(){}

    public async insertUsers(): Promise<void> {

        try{

            Users.forEach(async (newUser: UserSeed) => {

                const { username, email, password, role } = newUser;

                const userExists = await this.userModel.find({ username: username });

                if (userExists.length > 0){
                    console.log(`User with username ${username} already exists. Cannot insert.`);
                }
                else{

                    const envPassword = username === 'admin' ? process.env.ADMIN_INIT_PASS : process.env.USER_INIT_PASS;

                    const token = await this.userService.register(username, email, password, role);

                    console.log(token);

                    console.log(`New user to insert: ${newUser}`);
                    
                }
    
            })

        }
        catch (error: any) {
            throw new Error(`Unable to create user.\ Error: ${error.message}`);
        }

    }

}

export default SeedDatabase;
