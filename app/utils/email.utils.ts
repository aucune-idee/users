/**
 * 
 * @param email Handling of the gmail style email variations
 */
export function sanitizeEmail(email:String): String{
    let result = email.toLocaleLowerCase().split(".").join("");
    if(result.includes("+")){
        result = result.substring(0, result.indexOf("+")) + result.substring(result.indexOf("@"));
    }
    return result;
}
