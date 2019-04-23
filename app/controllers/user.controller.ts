import {User, IUser } from '../models/user.model';

import {BaseError, ErrorCodes} from '../exceptions/base-error';

import * as EmailValidator from 'email-validator';
import { sanitizeEmail } from "../utils/email.utils";

interface ICreateUserInput {
    email: IUser['email'];
    username: IUser['username'];
}

async function createUser({email,username}: ICreateUserInput): Promise<IUser> {
    checkInputs({email, username});
    await checkAccount({email, username});    
    let activation = makeid(42);

    return User.create({
        email: email,
        username: username,
        activation: activation
    })
    .then((data: IUser) => {
        return data;
    })
    .catch((error: Error) => {
        throw error;
    });
}

function checkInputs({email,username}: ICreateUserInput){
    if(username === null || username === undefined){
        throw new BaseError("Username is invalid", ErrorCodes.USERNAME_INVALID);
    }
    if(email === null || email === undefined){
        throw new BaseError("This email is invalid", ErrorCodes.INVALID_EMAIL);
    }
    email = email.trim();
    username = username.trim();

    if(!EmailValidator.validate(email.toString())){
        throw new BaseError("This email is invalid", ErrorCodes.INVALID_EMAIL);
    }
}

async function checkAccount({email,username}: ICreateUserInput){
    let sanitizedEmail = sanitizeEmail(email);
    let existingAcount = await User.findOne({$or : [
        { "searchUsername" : username.toLocaleLowerCase() },
        { "searchEmail" : sanitizedEmail }
    ]});
    if(existingAcount != null){
        throw new BaseError("Username or email already exists", ErrorCodes.EXISTING_ACCOUNT);
    }
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