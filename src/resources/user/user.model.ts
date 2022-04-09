import { Schema, model } from 'mongoose';
import bcrypt, { compare } from 'bcrypt';
import User from '@/resources/user/user.interface';

const UserSchema = new Schema({
    
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

}, { timestamps: true });

UserSchema.pre<User>('save', async function (next) {

    if (!this.isModified('password')){
        return next();
    }

    // Creates salt and hash at the same time
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();

});

UserSchema.methods.isValidPassword = async function(password: string): Promise<Error | boolean>{
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
