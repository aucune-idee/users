//lib/app.ts
import express from "express";
import Router from 'express-promise-router';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import configuration from "./config";

import routesConfigure from './routes';
import errorHandling from './exceptions/handler';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();        
    }

    private config(): void{
        // support application/json type post data
        //this.app.use(morgan("dev"));
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        let router:Router = Router();
        routesConfigure(router);
        this.app.use(router);

        mongoose.connect(configuration.mongodbConnectChain, {useNewUrlParser: true})
        .catch((err)=>{
            console.error(err);
            process.exit();
        });
        errorHandling(this.app);
    }
}

export default new App().app;