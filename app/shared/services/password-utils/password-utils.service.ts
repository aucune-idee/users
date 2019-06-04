import { Injectable } from '@nestjs/common';
import * as crypt from "js-sha512";
import { ConfigService } from "../../../config/config.service";

@Injectable()
export class PasswordUtilsService {
    constructor(
        private config:ConfigService){}
    public hash(password:String): String{
        password = password.trim();
        return crypt.sha512_256(this.config.envConfig.password.salt+password);
    }
}
