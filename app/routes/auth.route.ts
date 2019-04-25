import Router from 'express-promise-router';
import {authWithPassword, IAuthPasswordOutput}  from "../controllers/auth.controller";

let BASE = "/auth";

function configure(router:Router):void{
    router.post(BASE, async  (req, res) => {
        return authWithPassword({
            id: req.body.id,
            password: req.body.password
        })
        .then((result:IAuthPasswordOutput) => {
            res.json(result);
        })
    });
}


export default configure;