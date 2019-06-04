import { IUser } from '../interfaces/user.interface';

export class GetUsersInput{
    start?:number;
    size?:number;
    member?:number;
}

export class GetUsersOutput{
    lobbies:Array<IUser>;
    hasNext:boolean;
}