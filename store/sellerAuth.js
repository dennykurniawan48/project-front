const { createSlice } = require("@reduxjs/toolkit");

const initialState = { token: null, isLoggedIn: false }

const sellerSlice = createSlice({
    name: 'sellerAuth',
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

export const sellerAction = sellerSlice.actions

export default sellerSlice.reducer;