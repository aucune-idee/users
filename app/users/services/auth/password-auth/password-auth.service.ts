import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import jwt from 'jsonwebtoken'

import { IUser } from '../../../interfaces/user.interface';
import { UserCollectionName } from '../../../schemas/user.schema';

import { PasswordUtilsService } from "../../../../shared/services/password-utils/password-utils.service";
import { ConfigService } from "../../../../config/config.service";

import { AuthDto, AuthOutputDto } from '../../../dto/auth';
import { ERRORS, BasicException} from '../../../../shared/exceptions';

@Injectable()
export class PasswordAuthService {

    constructor(
        private passwordutils:PasswordUtilsService,
        private config:ConfigService,
        @InjectModel(UserCollectionName)
        private readonly userModel: Model<IUser>){}

    public async auth(input:AuthDto):Promise<AuthOutputDto>{
        return this.checkInputs(input)
        .then(this.controlePassword);

    }
    private async checkInputs({id, password}: AuthDto): Promise<AuthDto>{
        if(id === null || id === undefined || id.trim().length === 0){
            throw new BasicException(ERRORS.INVALID_USERNAME)
        }
        if(password === null || password === undefined || password.trim().length === 0){
            throw new BasicException(ERRORS.INVALID_PASSWORD)
        }
        return Promise.resolve({id, password});
    }
    
    private async controlePassword({id, password}: AuthDto): Promise<AuthOutputDto>{
        return this.userModel.findOne({
            $and:[
                {$or: [
                    {"searchUsername": id.trim().toLowerCase()},{"searchEmail": id.trim().toLowerCase()}]
                },
                {"password": this.passwordutils.hash(password)}
            ]
        })
        .then((user:IUser|null) => {
            if(!user){
                throw new BasicException(ERRORS.INVALID_AUTH)
            }
            let token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    roles: user.roles 
                },
                this.config.envConfig.jwt.secret,
                {
                    expiresIn: this.config.envConfig.jwt.ttl,
                    issuer: "n4b"
                }
            );
            return {token:token};
        });
    }
}
