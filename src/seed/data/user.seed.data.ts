import UserSeed from '../interfaces/user.seed.interface';

const users: UserSeed[] = [
    
    {
        username: "mightyadmin",
        email: "mightyadmin@test.com",
        password: 'ADMIN_INIT_PASS from .env file',
        role: "admin"
    },
    {
        username: "iamuser",
        email: "iamuser@test.com",
        password: 'USER_INIT_PASS from .env file',
        role: "user"
    }
    
];

export default users;
