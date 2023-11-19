import { configureStore } from "@reduxjs/toolkit";
import coins from "./coin/coinsListSlice";

export const store = configureStore({
    reducer: {
        coins
    }
});