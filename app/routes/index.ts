import userConfigure from './users.route';


import { Application } from "express";

let BASE = "/users";

function configure(app:Application):void{
    userConfigure(app);
}

export default configure;