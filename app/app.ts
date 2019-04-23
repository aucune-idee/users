//lib/app.ts

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import restConfigure from './rest';
import errorHandling from './exceptions/handler';



class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();        
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        restConfigure(this.app);
        

        mongoose.connect("mongodb+srv://users-admin:"+process.env.MONGODBPWD+"@cluster0-ly07g.gcp.mongodb.net/test?retryWrites=tru", {useNewUrlParser: true});
        errorHandling(this.app);
    }
}

export default new App().app;