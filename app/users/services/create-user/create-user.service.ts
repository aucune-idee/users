import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import * as EmailValidator from 'email-validator';

import { ConfigService } from '../../../config/config.service';

import { EmailUtilsService } from "../../../shared/services/email-utils/email-utils.service";
import { PasswordUtilsService } from "../../../shared/services/password-utils/password-utils.service";

import { IUser } from '../../interfaces/user.interface';
import { User } from '../../schemas/user.schema';

import { CreateUserDto } from '../../dto/create-user';

import { ERRORS, BasicException } from '../../../shared/exceptions';

@Injectable()
export class CreateUserService {
    constructor(
        private config:ConfigService,
        private passwordUtils:PasswordUtilsService,
        private emailUtils:EmailUtilsService,
        @InjectModel(User)
        private readonly userModel: ModelType<User>){}
        
    public create(input:CreateUserDto): Promise<User>{
        return this.checkInputs(input)
        .then(() => this.checkAccount(input))
        .then(() => this.controleAuth(input))
        .then((hashedPassword)=>{
            let activation = this.makeid(42);
            return this.userModel.create({
                email: input.email.trim(),
                username: input.username.trim(),
                activation: activation,
                password: hashedPassword
            })
            .catch(error => {
                console.error(error);
                throw error;
            })
        });
    }
    
    private async checkInputs(input: CreateUserDto): Promise<String>{
        if(input.username === null || input.username === undefined ||
            input.username.trim().length === 0){
            throw new BasicException(ERRORS.INVALID_USERNAME);
        }
        if(input.email === null || input.email === undefined ||
            input.email.trim().length === 0){
            throw new BasicException(ERRORS.INVALID_EMAIL);
        }
        input.username = input.username.trim();
    
        if(!EmailValidator.validate(input.email.toString())){
            throw new BasicException(ERRORS.INVALID_EMAIL);
        }
        return Promise.resolve("");
    }

    private async checkAccount(input: CreateUserDto): Promise<String>{
        let sanitizedEmail = this.emailUtils.sanitizeEmail(input.email);
        let existingAcount = await this.userModel.findOne({$or : [
            { "searchUsername" : input.username.toLocaleLowerCase() },
            { "searchEmail" : sanitizedEmail }
        ]});
        if(existingAcount != null){
            throw new BasicException(ERRORS.EXISTING_ACCOUNT);
        }
        return Promise.resolve("");
    }
    
    private async controleAuth(input: CreateUserDto): Promise<String>{
        if(!input.password || input.password.trim().length === 0){
            throw new BasicException(ERRORS.INVALID_PASSWORD);
        }
        input.password = input.password.trim();
        if(input.password.length < this.config.envConfig.password.minLength){
            throw new BasicException(ERRORS.INVALID_PASSWORD);
        }
        return Promise.resolve(this.passwordUtils.hash(input.password));
    }
    
    private makeid(length:number): String {
        let text:String = "";
        let possible:String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-{}\\/!?*<>";
        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}
