import { HttpException } from '@nestjs/common';
import { ErrorData } from './errors';

export class BasicException extends HttpException {
    constructor(data:ErrorData){
        super(data, data.status)
    }
}