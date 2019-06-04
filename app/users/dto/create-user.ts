import { IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username:String;
    @IsString()
    email:String;
    @IsString()
    password: String;
}
