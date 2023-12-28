import { createSlice } from "@reduxjs/toolkit";
import { users } from "../server/server";

const initialState = {
    authDetails: users,
}

export const authSlice = createSlice(
    {
        name: "authDetails",
        initialState,
        reducers: {
            selectUser: (state, action) => {
                state.authDetails.map((user) => user.id === action.payload.id ? Object.assign(user,{selected:true}): Object.assign(user,{selected:false}));
            },
            logInSuccess: (state, action) => {
                state.authDetails.map((user) => user.username === action.payload.username &&
                user.password === action.payload.password ? Object.assign(user,{loggedIn:true}): Object.assign(user,{loggedIn:false}));
                const activeUser = state.authDetails.filter((user) => user.loggedIn)[0];
                localStorage.setItem("activeUser",JSON.stringify(activeUser));
            },
        }
    }
)

export const { selectUser, logInSuccess } = authSlice.actions;

export default authSlice.reducer