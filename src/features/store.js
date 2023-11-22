import { configureStore } from "@reduxjs/toolkit";
import coins from "./coin/coinsListSlice";
import auth from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        auth,
        coins
    }
});