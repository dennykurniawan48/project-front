import { createAction, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], qty: 0 },
    reducers: {
        addItem(state, action){
            const existingItem = state.items.findIndex(item => item.id === action.payload.id)
            if(existingItem != -1){
                state.items[existingItem].qty += action.payload.qty
                state.items[existingItem].price = action.payload.price
                state.items[existingItem].product_name = action.payload.product_name
            }else{
                state.items.push({id: action.payload.id, price: action.payload.price, qty: action.payload.qty, product_name: action.payload.product_name, main_image: action.payload.main_image})
            }
            state.qty += action.payload.qty
        },
        removeItem(state, action){

        },
        changeItem(state, action){

        },
        controlItem(state, action){
            const existingItem = state.items.findIndex(item => item.id === action.payload.id)
            if(existingItem != -1){
                if(state.items[existingItem].qty === 1){
                    state.items = state.items.filter(item => item.id != action.payload.id)
                }else{
                    state.items[existingItem].qty += action.payload.qty
                    state.items[existingItem].price = action.payload.price
                    state.items[existingItem].product_name = action.payload.product_name
                }
            }
            state.qty += action.payload.qty
        }
    }
})

export const cartAction = cartSlice.actions

export default cartSlice.reducer