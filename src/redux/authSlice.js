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
                state.authDetails.map((user) => user.id = action.payload.id ? Object.assign(user,{selected:true}): Object.assign(user,{selected:false}))
            }
        }
    }
)

export const { selectUser } = authSlice.actions;

export default authSlice.reducer