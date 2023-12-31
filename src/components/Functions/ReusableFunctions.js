/**
 * 
 * @param {array} users 
 * @returns "true if any of the users is logged-in else false"
 */
export const isLoggedIn = (users)=>{
    for(let user of users) {
        if(user.loggedIn){
            return true;
        }
    }
    return false;
}


export const createQuestionObjectForTable = (questionObject) => {
    return Object.assign({},{})
}