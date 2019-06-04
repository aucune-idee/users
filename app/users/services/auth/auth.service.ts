import { Injectable } from '@nestjs/common';

import { AuthDto, AuthOutputDto } from '../../dto/auth';
import { ERRORS, BasicException} from '../../../shared/exceptions';
import { PasswordAuthService } from "./password-auth/password-auth.service";

@Injectable()
export class AuthService {

    constructor(private passwordAuth:PasswordAuthService){}

    public async auth(input:AuthDto):Promise<AuthOutputDto>{
        if(input.password != undefined){
            return this.passwordAuth.auth(input);
        }
        throw new BasicException(ERRORS.AUTH_NOT_SUPPORTED)
    }
}
