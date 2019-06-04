import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { ConfigService } from "../../config/config.service";

import { AUTHORIZATION } from '../../shared/vars';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configuration:ConfigService){}
  
  use(req: any, res: any, next: () => void) {
    if(req === undefined || req.headers === undefined){
        return next();
    }
    let auth = req.headers[AUTHORIZATION];
    if(auth === undefined){
        return next();
    }
    const token = <string>auth.replace('Bearer ', '');
    try {
        let payload = <any>jwt.verify(token, this.configuration.envConfig.jwt.secret);
        if(!req.jwt){
            req.jwt = {};
        }
        req.jwt = payload;
    } catch (error) {
        console.error(error);
    }
    next();
  }
}
