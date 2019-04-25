import userConfigure from './users.route';

import Router from 'express-promise-router';

let BASE = "/users";

function configure(router:Router):void{
    userConfigure(router);
}

export default configure;