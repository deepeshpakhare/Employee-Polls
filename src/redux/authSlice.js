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
                state.authDetails.push(...action.payload);
            },
            selectUser: (state, action) => {
                state.authDetails.map((user) => user.id === action.payload.id ? Object.assign(user,{selected:true}): Object.assign(user,{selected:false}));
            },
            logInSuccess: (state, action) => {
                state.authDetails.map((user) => user.username === action.payload.username &&
                user.password === action.payload.password ? Object.assign(user,{loggedIn:true}): Object.assign(user,{loggedIn:false}));
                const activeUser = state.authDetails.filter((user) => user.loggedIn)[0];
                localStorage.setItem("activeUser",JSON.stringify(activeUser));
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