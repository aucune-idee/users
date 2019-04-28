import { Request, Response, Router } from 'express';
import {logged} from '../middlewares/security';

import { createUser, getUser }  from "../controllers/user.controller";

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
    })
    .get(BASE, logged(), async(req:Request, res:Response) =>{
        res.json({txt:":)"});
    })
    .get(BASE+"/profil/:id", logged(), async (req:Request, res:Response) => {
        return getUser(req.params.id)
        .then((user) => {
            delete user['email'];
            return user;
        })
        .then((user) => {
            console.log(user);
            res.json(user);
        })
    })
    .get(BASE+"/profil", logged(), async (req:Request, res:Response) => {
        return getUser(res.locals.jwt.payload.id).then((user) => {
            res.json(user);
        });
    });
}


export default configure;