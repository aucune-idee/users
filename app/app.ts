//lib/app.ts
import express from "express";
import cors from 'cors';
import Router from 'express-promise-router';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import configuration from "./config";

import errorHandling from './exceptions/handler';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();        
    }

    private config(): void{
        
        mongoose.connect(configuration.mongodbConnectChain, {useNewUrlParser: true})
        .then(() => {
            this.configRoutes();
        })
        .catch((err)=>{
            console.error(err);
            process.exit();
        });
    }
    private configRoutes():void{
          // support application/json type post data
          this.app.use(cors({
            origin: function (origin:any, callback:any) {
                if (configuration.cors.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            }
          }));
        this.app.use(morgan("tiny"));
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        let router:express.Router = Router();
        
        import('./routes').then(configure => configure.default(router));
        this.app.use(router);

        errorHandling(this.app);
    }
}


export default new App().app;