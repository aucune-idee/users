import Router from 'express-promise-router';
import AuthController  from "../controllers/auth.controller";

let BASE = "/auth";

function configure(router:Router):void{
    router.post(BASE, async  (req, res, next) => {
        try{
            const user = await AuthController.authWithPassword({
                id: req.body.id,
                password: req.body.password
            });
            return res.json({ user: user });
        }catch(err){
            next(err);
        }
    });
}


export default configure;