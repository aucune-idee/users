import Router from 'express-promise-router';

import UserController  from "../controllers/user.controller";

let BASE = "/users";

function configure(router:Router):void{
    router.post(BASE, async  (req, res, next) => {
        return UserController.createUser({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            return res.json({ user: user })
        });
    });
    
    router.get(BASE, async(req, res, next) =>{
        res.json({txt:":)"});
    })
}


export default configure;