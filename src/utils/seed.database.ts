import UserSeed from '../seed/interfaces/user.seed.interface';
import UserModel from '@/resources/user/user.model';
import Users from '../seed/data/user.seed.data';
import bcrypt from 'bcrypt';

class SeedDatabase{

    private userModel = UserModel;

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

                    const hash = await bcrypt.hash(envPassword!.toString(), 10);
                    
                    const createdUser = await this.userModel.create({
                        username,
                        email,
                        hash,
                        role
                    });

                    console.log(createdUser);

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
