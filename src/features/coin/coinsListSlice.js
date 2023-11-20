import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async (page, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
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
    page: 1,
    pageSize: 10,
  },
};

const coinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setPagination: (state, { payload }) => {
      state.pagination = {...state.pagination, ...payload}
     }
   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload?.data;
        state.pagination.total = state.coins.length;
        state.pagination.length = state.pagination.pageSize * state.pagination.page;
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectCoins = (state) => state.coins;
export const selectPagination = (state) => state.coins.pagination;
export const {
    setPagination,
  } = coinSlice.actions

export default coinSlice.reducer;
