import {User, IUser } from '../models/user.model';

import {BaseError, ErrorCodes} from '../exceptions/base-error';

import * as EmailValidator from 'email-validator';
import { sanitizeEmail } from "../utils/email.utils";

interface ICreateUserInput {
    email: IUser['email'];
    username: IUser['username'];
}

async function createUser({email,username}: ICreateUserInput): Promise<IUser> {
    return checkInputs({email, username})
    .then(() => checkAccount({email, username}))
    .then(()=>{
        let activation = makeid(42);
        return User.create({
            email: email,
            username: username,
            activation: activation
        })
    })
    .then((data: IUser) => {
        return data;
    })
    .catch((error: Error) => {
        throw error;
    });
}

function checkInputs({email,username}: ICreateUserInput): Promise<String>{
    if(username === null || username === undefined || username.trim().length === 0){
        return Promise.reject(new BaseError("Username is invalid", ErrorCodes.INVALID_USERNAME));
    }
    if(email === null || email === undefined || email.trim().length === 0){
        return Promise.reject(new BaseError("This email is invalid", ErrorCodes.INVALID_EMAIL));
    }
    email = email.trim();
    username = username.trim();

    if(!EmailValidator.validate(email.toString())){
        return Promise.reject(new BaseError("This email is invalid", ErrorCodes.INVALID_EMAIL));
    }
    return Promise.resolve("");
}

async function checkAccount({email,username}: ICreateUserInput): Promise<String>{
    let sanitizedEmail = sanitizeEmail(email);
    let existingAcount = await User.findOne({$or : [
        { "searchUsername" : username.toLocaleLowerCase() },
        { "searchEmail" : sanitizedEmail }
    ]});
    if(existingAcount != null){
        return Promise.reject(new BaseError("Username or email already exists", ErrorCodes.EXISTING_ACCOUNT));
    }
    return Promise.resolve("");
}

function makeid(length:number): String {
    let text:String = "";
    let possible:String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-{}\\/!?*<>";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
  

  
export default {
    createUser
};