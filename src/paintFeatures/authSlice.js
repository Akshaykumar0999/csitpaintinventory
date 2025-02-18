import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user")) || {};
const initialState = {
    isLoggedIn: storedUser.token ? true : false,
    token: storedUser.token || 'no token',
    user: storedUser.user || {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isLoggedIn = true,
            state.token = action.payload.token,
            state.user = action.payload.user,
            localStorage.setItem('user', JSON.stringify({
                token: state.token,
                user: state.user,
            }))
        },
        deleteUser: (state) => {
            state.isLoggedIn = false,
            state.token = 'no token',
            state.user = {},
            localStorage.removeItem('user');
        }
    }
})

export const { setUser, deleteUser } = authSlice.actions;

export default authSlice.reducer