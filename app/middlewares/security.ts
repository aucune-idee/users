import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import configuration from '../config';

import {BaseError, ErrorCodes} from '../exceptions/base-error';

const AUTHORIZATION = "authorization";

export const logged = () => (req: Request, res: Response, next: NextFunction) => {
    if(req === undefined || req.headers === undefined){
        return next();
    }
    let auth = req.headers[AUTHORIZATION];
    if(auth === undefined){
        return next();
    }
    const token = <string>auth.replace('Bearer ', '');

    try {
        let payload = <any>jwt.verify(token, configuration.jwt.secret);
        if(!res.locals.jwt){
            res.locals.jwt = {};
        }
        res.locals.jwt.payload = payload;
    } catch (error) {
        console.error(error);
        return next(new BaseError("Auth failed", ErrorCodes.INVALID_AUTH));
    }
    
    next();
}

export const auth = (input:String | Array<String>) => {
    let roles:Array<String>;
    if(input instanceof String){
        roles =  [<String>input];
    }
    else{
        roles = <Array<String>>input;
    }
    return (req: Request, res: Response, next: NextFunction) => {
        for(let role in roles){
            if(res.locals.jwt.payload.roles.includes(role)){
                return next();
            }
        }
        return next(new BaseError("Unauthorized", ErrorCodes.INVALID_AUTH));
    }
}
