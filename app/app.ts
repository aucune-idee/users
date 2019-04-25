//lib/app.ts
import express from "express";
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
        this.app.use(morgan("dev"));
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        routesConfigure(this.app);
        

        mongoose.connect(configuration.mongodbConnectChain, {useNewUrlParser: true});
        errorHandling(this.app);
    }
}

export default new App().app;