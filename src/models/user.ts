import { Types } from 'mongoose';

export default class User{
    constructor(public username: string, public password: string, public email: string, public role: string, public id?: Types.ObjectId){}
}