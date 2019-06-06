import { Controller, Get, Post, Body,
 UseGuards, Param} from '@nestjs/common';
import { Request } from 'express';

import { JwtData } from '../../common/decorators/jwt-data.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';

import { CreateUserService, GetusersService as GetUsersService } from '../services';
import { CreateUserDto } from '../dto/create-user';


@Controller('users')
export class UsersController {
    
    constructor(
      private createUser:CreateUserService,
      private findUsers:GetUsersService){}
    
    @Post()
    @UseGuards(AuthGuard)
    async addUser(@Body() input: CreateUserDto) {
      return this.createUser.create(input);
    }
    
    @Get('/profil/:id')
    @UseGuards(AuthGuard)
    async getProfil(@Param('id') id:number){
      return this.findUsers.getUser(id)
        .then((user) => {
            delete user['email'];
            return user;
        })
    }
    @Get('/profil')
    @UseGuards(AuthGuard)
    async getOwnProfil(@JwtData() payload: any){
      return this.findUsers.getUser(payload.id);
    }
    @Get('/:id')
    @UseGuards(AuthGuard)
    async getUsers(@Param('id') id:String){
      if(id.includes("-")){
        console.log("ids : ", id)
        this.findUsers.getUsers(id.split('-'));
      }
      else{
        console.log("id : ", id)
        this.getProfil(+id);
      }
    }
}
