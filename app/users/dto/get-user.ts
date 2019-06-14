import { PrivateUser } from '../schemas/user.schema';

export class GetUsersInput{
    start?:number;
    size?:number;
    member?:number;
}

export class GetUsersOutput{
    lobbies:Array<PrivateUser>;
    hasNext:boolean;
}