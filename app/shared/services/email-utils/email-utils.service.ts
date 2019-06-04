import { Injectable } from '@nestjs/common';

/**
 * 
 * @param email Handling of the gmail style email variations
 */
@Injectable()
export class EmailUtilsService {

    public sanitizeEmail(email:String): String{
       return EmailUtilsService.sanitizeEmail(email);
    }

    public static sanitizeEmail(email:String): String{
        let result = email.toLocaleLowerCase().split(".").join("");
        if(result.includes("+")){
            result = result.substring(0, result.indexOf("+")) + result.substring(result.indexOf("@"));
        }
        return result;
    }

}
