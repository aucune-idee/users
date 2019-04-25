let env = process.env.NODE_ENV ? process.env.NODE_ENV : "local";
let mongodbConnectChain =
    env == 'dc' ? 'mongodb+srv://users-admin:'+process.env.MONGODBPWD+'@cluster0-ly07g.gcp.mongodb.net/test?retryWrites=tru' :
    'mongodb://'+(process.env.IP ? process.env.IP : "localhost")+':28017/data';
    
export default {
    env : env,
    port: process.env.PORT ? process.env.PORT : 3000,
    mongodbConnectChain : mongodbConnectChain
}