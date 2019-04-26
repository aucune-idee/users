import {User, IUser } from '../models/user.model';

import {BaseError, ErrorCodes} from '../exceptions/base-error';

import * as EmailValidator from 'email-validator';
import { sanitizeEmail } from "../utils/email.utils";
import { hash } from "../utils/password.utils";
import configuration from "../config";

interface ICreateUserInput {
    email: IUser['email'];
    username: IUser['username'];
    password?: IUser['password'];
}


export async function createUser({email,username, password}: ICreateUserInput): Promise<IUser> {
    return checkInputs({email, username})
    .then(() => checkAccount({email, username}))
    .then(() => controleAuth(password))
    .then((hashedPassword)=>{
        console.log("hash", hashedPassword)
        let activation = makeid(42);
        return User.create({
            email: email.trim(),
            username: username.trim(),
            activation: activation,
            password: hashedPassword
        })
    });
}

export async function getUser(id:String):Promise<IUser>{
    return User.findOne({_id:id}).exec().then(user => {
        if(user){
            return user;
        }
        return Promise.reject();
    });
}

function checkInputs({email,username}: ICreateUserInput): Promise<String>{
    if(username === null || username === undefined || username.trim().length === 0){
        return Promise.reject(new BaseError("Username is invalid", ErrorCodes.INVALID_USERNAME));
    }
    if(email === null || email === undefined || email.trim().length === 0){
        return Promise.reject(new BaseError("This email is invalid", ErrorCodes.INVALID_EMAIL));
    }
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

async function controleAuth(password:String|undefined): Promise<String>{
    if(!password || password.trim().length === 0){
        return Promise.reject(new BaseError("Invalid password", ErrorCodes.INVALID_PASSWORD));
    }
    password = password.trim();
    if(password.length < configuration.password.minLength){
        return Promise.reject(new BaseError("Invalid password", ErrorCodes.INVALID_PASSWORD));
    }
    //return Promise.resolve();
    return Promise.resolve(hash(password));
}

function makeid(length:number): String {
    let text:String = "";
    let possible:String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-{}\\/!?*<>";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
