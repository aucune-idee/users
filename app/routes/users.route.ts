import Router from 'express-promise-router';

import {logged, auth} from '../middlewares/security';

import { createUser, getUser }  from "../controllers/user.controller";

let BASE = "/users";

function configure(router:Router):void{
    router.post(BASE, async  (req, res, next) => {
        return createUser({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            return res.json({ user: user })
        });
    })
    .get(BASE, logged(), async(req, res, next) =>{
        res.json({txt:":)"});
    })
    .get(BASE+"/profil/:id", logged(), async (req, res, next) => {
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
    .get(BASE+"/profil", logged(), async (req, res, next) => {
        return getUser(res.locals.jwt.payload.id).then((user) => {
            res.json(user);
        });
    });
}


export default configure;