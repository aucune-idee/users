import userConfigure from './users.rest';


import { Application } from "express";

let BASE = "/users";

function configure(app:Application):void{
    console.log("confiure rest");
    userConfigure(app);
}


export default configure;