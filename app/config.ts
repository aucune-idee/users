let env = process.env.NODE_ENV ? process.env.NODE_ENV : "local";
let mongodbConnectChain =
    env == 'dc' ? 'mongodb+srv://users-admin:'+process.env.MONGODBPWD+'@cluster0-ly07g.gcp.mongodb.net/test?retryWrites=tru' :
    'mongodb://'+(process.env.IP && false ? process.env.IP : "localhost")+':27017/data';
    
export default {
    env : env,
    port: process.env.PORT ? process.env.PORT : 3000,
    mongodbConnectChain : mongodbConnectChain,
    password:{
        minLength : 10,
        salt: process.env.N4B_SALT ? process.env.N4B_SALT : "$2b$31$x6EQEgpPTDZZ3VlnM.s6ne"
    },
    jwt:{
        secret: process.env.N4B_JWT_SECRET ? process.env.N4B_JWT_SECRET : "q$qfqza,02aqsv$:§fsqv@fz",
        ttl:"1h"
    }
}