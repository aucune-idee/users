import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser, IPrivateUser } from '../../interfaces/user.interface';

import { UserCollectionName } from '../../schemas/user.schema';
import { GetUsersInput, GetUsersOutput } from '../../dto/get-user';

@Injectable()
export class GetusersService {
    
    constructor(
        @InjectModel(UserCollectionName)
        private readonly userModel: Model<IUser>){}
    
    public async getUser(id:number):Promise<IUser>{
        return this.userModel.findOne({_id:id}).exec().then(user => {
            if(user){
                return user;
            }
            return Promise.reject();
        });
    }
    
    public async getUsers(ids:Array<String>):Promise<IPrivateUser[]>{
        return this.userModel.find({
            $or:ids.map(i => {return {_id:i}})
        })
        .then(users => {
            if(users != null && users != undefined){
                return users.map(user => {
                    return {
                        _id:user._id,
                        username: user.username,
                        createdAt: user.createdAt
                    }
                });
            }
            return Promise.reject();
        });
    }
}
