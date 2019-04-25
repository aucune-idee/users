export async function authWithPassword({id,password}:IAuthPasswordInput){
    
}

interface IAuthPasswordInput {
    id: IUser['username'] | IUser['email'];
    password: IUser['password'];
}