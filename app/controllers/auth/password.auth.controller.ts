import jwt from 'jsonwebtoken'

import {User, IUser } from '../../models/user.model';

import {BaseError, ErrorCodes} from '../../exceptions/base-error';

import { hash } from "../../utils/password.utils";
import configuration from '../../config';

export async function authWithPassword({id,password}:IAuthPasswordInput): Promise<IAuthPasswordOutput>{
    return checkInputs({id, password})
        .then(() => controlePassword({id, password}));
}

async function checkInputs({id, password}: IAuthPasswordInput): Promise<String>{
    if(id === null || id === undefined || id.trim().length === 0){
        return Promise.reject(new BaseError("Username is invalid", ErrorCodes.INVALID_USERNAME));
    }
    if(password === null || password === undefined || password.trim().length === 0){
        return Promise.reject(new BaseError("This email is invalid", ErrorCodes.INVALID_PASSWORD));
    }
    return Promise.resolve("");
}

async function controlePassword({id, password}: IAuthPasswordInput): Promise<IAuthPasswordOutput>{
    return User.findOne({
        $and:[
            {$or: [
                {"searchUsername": id.trim().toLowerCase()},{"searchEmail": id.trim().toLowerCase()}]
            },
            {"password": hash(password)}
        ]
    })
    .then((user:IUser|null) => {
        if(!user){
            return Promise.reject(new BaseError("Auth failed", ErrorCodes.INVALID_AUTH));
        }
        let token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                roles: user.roles 
            },
            configuration.jwt.secret,
            {
                expiresIn: configuration.jwt.ttl,
                issuer: "n4b"
            }
        );
        return {token:token};
    });
}

interface IAuthPasswordInput {
    id: IUser['username'] | IUser['email'];
    password: IUser['password'];
}
export interface IAuthPasswordOutput {
    token:String;
}