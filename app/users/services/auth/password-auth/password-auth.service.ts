import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { sign }  from 'jsonwebtoken'

import { IUser } from '../../../interfaces/user.interface';
import { User } from '../../../schemas/user.schema';

import { PasswordUtilsService } from "../../../../shared/services/password-utils/password-utils.service";
import { ConfigService } from "../../../../config/config.service";

import { AuthDto, AuthOutputDto } from '../../../dto/auth';
import { ERRORS, BasicException} from '../../../../shared/exceptions';

@Injectable()
export class PasswordAuthService {

    constructor(
        private passwordutils:PasswordUtilsService,
        private config:ConfigService,
        @InjectModel(User)
        private readonly userModel: ModelType<User>){
        }

    public async auth(input:AuthDto):Promise<AuthOutputDto>{
        return this.checkInputs(input)
        .then((i) => this.controlePassword(i));

    }
    private async checkInputs(input: AuthDto): Promise<AuthDto>{
        if(input.id === null || input.id === undefined || input.id.trim().length === 0){
            throw new BasicException(ERRORS.INVALID_USERNAME)
        }
        if(input.password === null || input.password === undefined || input.password.trim().length === 0){
            throw new BasicException(ERRORS.INVALID_PASSWORD)
        }
        return Promise.resolve(input);
    }
    
    private async controlePassword(input: AuthDto): Promise<AuthOutputDto>{
        return this.userModel.findOne({
            $and:[
                {$or: [
                    {"searchUsername": input.id.trim().toLowerCase()},{"searchEmail": input.id.trim().toLowerCase()}]
                },
                {"password": this.passwordutils.hash(input.password)}
            ]
        })
        .then((user:User|null) => {
            if(!user){
                throw new BasicException(ERRORS.INVALID_AUTH)
            }
            let token = sign(
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
