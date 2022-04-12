import { Document } from 'mongoose';

export default interface User extends Document {
    
    email: string;
    username: string;
    password: string;
    role: string;
    propertyToEdit1: string;
    propertyToEdit2: string;
    propertyToEdit3: string;
    propertyToEdit4: string;

    isValidPassword(password: string): Promise<Error | boolean>;
    
}
