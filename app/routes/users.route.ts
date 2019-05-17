import { Request, Response, Router } from 'express';
import {logged} from '../middlewares/security';

import { createUser, getUser, getUsers }  from "../controllers/user.controller";

let BASE = "/users";

function configure(router:Router):void{
    router.post(BASE, async  (req:Request, res:Response) => {
        return createUser({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            return res.json({ user: user })
        });
    });
    router.get(BASE+"/profil/:id", logged(), async (req:Request, res:Response) => {
        return getUser(req.params.id)
        .then((user) => {
            delete user['email'];
            return user;
        })
        .then((user) => {
            res.json(user);
        })
    })
    router.get(BASE+"/profil", logged(), async (req:Request, res:Response) => {
        return getUser(res.locals.jwt.payload.id).then((user) => {
            res.json(user);
        });
    })
    router.get(BASE+"/:id", async(req:Request, res:Response) =>{
        if(req.params.id.includes("-")){
            getUsers(req.params.id.split('-')).then(users => res.json(users));
        }
        else{
            getUser(req.params.id).then(user => res.json(user));
        }
    })
}

export default configure;