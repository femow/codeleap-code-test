import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: null,
    loggedin: false,
}

const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login(state, action) {
            state.username = action.payload;
            state.loggedin = true;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;