import * as crypt from "js-sha512";
import configuration from "../config";
/**
 * 
 * @param password 
 */
export function hash(password:String): String{
    password = password.trim();
    return crypt.sha512_256(configuration.password.salt+password);
}