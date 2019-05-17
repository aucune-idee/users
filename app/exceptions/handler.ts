import { Application, Request, Response, NextFunction } from "express";
import { BaseError} from "./base-error"

let BASE = "/users";

function configure(app:Application):void{
    app.use((err:any, req:Request, res:Response, next:NextFunction) => {
        //console.log(err);
        //console.log(req.url)
        if(err.isBaseError){
            return handleBaseError(err, res);
        }
        res.status(500).json(err);
    });
}

function handleBaseError(err:BaseError, res:Response){
    res.status(BaseError.code2http(err.code)).json(err);
}


export default configure;