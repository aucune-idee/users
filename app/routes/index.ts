import userConfigure from './users.route';
import authConfigure from './auth.route';

import Router from 'express-promise-router';


function configure(router:Router):void{
    userConfigure(router);
    authConfigure(router);
}

export default configure;