import { HttpStatus } from '@nestjs/common';

export interface ErrorData{
    code:Number,
    error:String,
    status:HttpStatus
}

export const ERRORS:{[index:string] : ErrorData} = {
    INVALID_USERNAME:{
        code: 0,
        error: "Username is invalid",
        status: HttpStatus.UNAUTHORIZED
    },
    LOBBY_INITIALIZATION_ERROR:{
        code: 1,
        error: "This email is invalid",
        status: HttpStatus.UNAUTHORIZED
        
    },
    EXISTING_ACCOUNT:{
        code: 2,
        error: "Username or email already exists",
        status: HttpStatus.UNAUTHORIZED
    },
    AUTH_NOT_SUPPORTED:{
        code:3,
        error: "This authentication method is not (yet) supported",
        status: HttpStatus.NOT_IMPLEMENTED
    },
    INVALID_AUTH:{
        code:4,
        error: "Auth failed",
        status: HttpStatus.UNAUTHORIZED
    }
}