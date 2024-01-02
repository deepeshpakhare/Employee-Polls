/**
 * 
 * @param {array} users 
 * @returns "true if any of the users is logged-in else false"
 */
export const isLoggedIn = ()=>{
    if (localStorage.getItem("activeUser")){
      return true;
    }
    return false;
}


/**
* 
* @param {Array} users 
* @returns "The user who is logged in else Error"
*/
export const getCurrentUser = (users) => {
 for (let user of users) {
   if (user.loggedIn) {
     return user;
   }
 }
 return Error("Error in logged in user");
}
