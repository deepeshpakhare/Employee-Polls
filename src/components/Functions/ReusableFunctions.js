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

export const dateSortingFunction = (a, b) => {
  if (new Date(a.timestamp) < new Date(b.timestamp)) {
    return 1;
  } else if (new Date(a.timestamp) > new Date(b.timestamp)) {
    return -1;
  }
  return 0;
}

  /**
   * @description "Returns an array of question ids that have been 
   * answered by logged in user and which are stored in user object"
   * @returns {array}
   */
  export const getAnsweredQustions = (users) => {
    const user = JSON.parse(localStorage.getItem("activeUser"));
    let updatedUser = {};
    for (const key in users) {
      if (key === user.id) {
        updatedUser = users[key];
      }
    }
    console.log(updatedUser);
    const userKeysArray = Object.keys(updatedUser);
    const questionsAnsweredByUser = [];
    for (const key of userKeysArray) {
      if (key === "answers") {
        for (const answer in updatedUser[key]) {
          questionsAnsweredByUser.push(answer);
        }
      }
    }
    console.log(questionsAnsweredByUser);
    return questionsAnsweredByUser;
  }