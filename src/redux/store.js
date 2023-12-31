import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import appDataReducer from "./appDataSlice";

const store = configureStore(
    {
        reducer: {
            auth: authReducer,
            app: appDataReducer,
        }
    }       
    
);

export default store;