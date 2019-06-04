import { Controller,Post, Body } from '@nestjs/common';

import { AuthService } from '../services/auth/auth.service';

import { AuthDto, AuthOutputDto } from '../dto/auth';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post()
    async auth(@Body() input: AuthDto) :Promise<AuthOutputDto>{
      return this.authService.auth(input);
    }
}
