
import { Application } from "express";
import UserController  from "../controllers/user.controller";

let BASE = "/users";

function configure(app:Application):void{
    console.log("confiure rest user");
    app.post(BASE, async  (req, res, next) => {
        try{
            const user = await UserController.createUser({
                username: req.body.username,
                email: req.body.email
            });
            return res.json({ user: user });
        }catch(err){
            next(err);
        }
    });
}


export default configure;