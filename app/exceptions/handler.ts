import { Application, Request, Response, NextFunction } from "express";
import { BaseError} from "./base-error"

let BASE = "/users";

function configure(app:Application):void{
    console.log("Error handling");
    app.use((err:any, req:Request, res:Response, next:NextFunction) => {
        console.log(err);
        if(err instanceof BaseError){
            return handleBaseError(err, res);
        }
        res.status(500).json(err);
    });
}

function handleBaseError(err:BaseError, res:Response){
    res.status(BaseError.code2http(err.code)).json(err);
}


export default configure;