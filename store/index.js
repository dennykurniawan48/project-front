const { configureStore } = require("@reduxjs/toolkit");
import authSlice from './auth'
import cartSlice from './cart'
import sellerAuth from './sellerAuth';

const store = configureStore({
    reducer: {auth: authSlice, cart: cartSlice, authSeller: sellerAuth},
})

export default store