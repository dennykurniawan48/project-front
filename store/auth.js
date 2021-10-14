

const { createSlice } = require("@reduxjs/toolkit");

const initialState = { token: null, isLoggedIn: false }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action){
            state.token = action.payload.token
            state.isLoggedIn = true
        },
        logout(state){
            state.token = null
            state.isLoggedIn = false
        }
    }
})

export const authAction = authSlice.actions

export default authSlice.reducer;