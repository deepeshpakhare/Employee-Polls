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