import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appData:[]
}

export const appDataSlice = createSlice(
    {
        name:"appData",
        initialState,
        reducers:{
            setQuestions:(state, action) => {
                state.appData.push(...action.payload);
            },
            addNewQuestion:(state, action) => {
                state.appData.push(action.payload);
            },
        }

    }
)

export const {setQuestions, addNewQuestion} = appDataSlice.actions;

export default appDataSlice.reducer;