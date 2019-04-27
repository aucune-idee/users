let env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "local";

if(!['local', 'development'].includes(env)){
    process.exit(1);
}
console.log(env);
if(env != "local"){
    env = "";
}
else {
    env = "-"+env;
}
let secret = require('./secret'+env+'.json');

let conf = {
    port: process.env.PORT ? process.env.PORT : 3000,
    
    password:{
        minLength : 10,
    }
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