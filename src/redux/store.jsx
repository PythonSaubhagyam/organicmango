import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import shopReducer from "../redux/slices/shopApi"
import categoryReducer from "../redux/slices/categoryApi"
import homeReducer from "../redux/slices/homeApi"



export const store = configureStore({
    reducer: {
        home: homeReducer,
        shop: shopReducer,
        category: categoryReducer,

    }
})

setupListeners(store.dispatch);
