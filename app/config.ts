let env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "local";

let secret = require('./secret'+(env == "local" ? "-local" : "")+'.json');

let conf:any = {
    port: process.env.PORT ? process.env.PORT : 3000,
    
    password:{
        minLength : 10,
    },
    cors:["https://n4b-dev.appspot.com", "https://n4b-dev-users-kamule42.c9users.io"]
};

function merge(a:any, b:any){
    for(let key in b){
        if(!a.hasOwnProperty(key) || !(b[key] instanceof Object)){
            a[key] = b[key];
        }else{
            a[key] = merge(a[key], b[key]);
        }
    }
    return a;
}
conf = merge(conf, secret);
 
export default conf;