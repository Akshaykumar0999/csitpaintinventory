import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../paintFeatures/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})