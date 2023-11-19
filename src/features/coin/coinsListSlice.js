import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    return response;
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error; 
  }
});

const initialState = {
  coins: [],
  loading: false,
  pagination: {
    total: 0,
    length: 0,
    pageSize: 10,
    page: 1,
  },
};

const coinSlice = createSlice({
  name: "coins",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload?.data;
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.loading = false;
      });
  },
});


export const getCoinData = (state) => state.coins;

export default coinSlice.reducer;
