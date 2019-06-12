import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { IUser, IPrivateUser } from '../../interfaces/user.interface';

import { User } from '../../schemas/user.schema';
import { GetUsersInput, GetUsersOutput } from '../../dto/get-user';

@Injectable()
export class GetusersService {
    
    constructor(
        @InjectModel(User)
        private readonly userModel: ModelType<User>){}
    
    public async getUser(id:number):Promise<User>{
        return this.userModel.findOne({_id:id}).exec().then(user => {
            if(user){
                return user;
            }
            return Promise.reject();
        });
    }
    
    public async getUsers(ids:Array<String>):Promise<IPrivateUser[]>{
        return this.userModel.find({
            $or:ids.map(i => ({_id:i}))
        })
        .then(users => {
            if(users != null && users != undefined){
                return users.map(user => ({
                    _id:user._id,
                    username: user.username,
                    createdAt: user.createdAt
                }));
            }
            return Promise.reject();
        });
    }
}
