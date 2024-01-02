import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authDetails: [],
}

export const authSlice = createSlice(
    {
        name: "authDetails",
        initialState,
        reducers: {
            getUsers: (state,action) => {
                state.authDetails = [];
                state.authDetails.push(action.payload);
            },
            logInSuccess: (state, action) => {
                localStorage.setItem("activeUser",JSON.stringify(action.payload));
            },
            logOutSuccess: (state, action) => {
                localStorage.removeItem("activeUser");
                Object.assign(state.authDetails.filter((user) => user.loggedIn && user.selected)[0],{selected:false},{loggedIn:false});
            }
        }    
    }
)

export const { selectUser, logInSuccess, logOutSuccess, getUsers } = authSlice.actions;

export default authSlice.reducer