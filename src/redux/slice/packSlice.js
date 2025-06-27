//Librery import
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

//Local import
import {BASE_URL, packs} from '@api/productApi';

export const fetchPacks = createAsyncThunk(
  'packs/fetchPacks',
  async (params = {}, {rejectWithValue}) => {
    const {page = 1, per_page = 10} = params;
    try {
      const res = await axios.get(
        `${BASE_URL}${packs}?_per_page=${per_page}&_page=${page}`,
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  },
);

export const getSinglePack = createAsyncThunk(
  'packs/getSinglePack',
  async (packId, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${BASE_URL}${packs}/${packId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  },
);

const packSlice = createSlice({
  name: 'packs',
  initialState: {
    packList: [],
    singlePack: null,
    cartItems: [],
    loading: false,
    error: null,
    first: 1,
    items: 0,
    last: 0,
    next: 0,
    pages: 0,
    prev: null,
  },
  reducers: {
    addPackToCart: (state, action) => {
      const pack = action.payload;
      const existing = state.cartItems.find(item => item.id === pack.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({...pack, quantity: 1});
      }
    },
    decreasePackQuantity: (state, action) => {
      const item = state.cartItems.find(p => p.id === action.payload);
      if (item) {
        item.quantity > 1
          ? (item.quantity -= 1)
          : (state.cartItems = state.cartItems.filter(p => p.id !== item.id));
      }
    },
    removePackFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload,
      );
    },
    clearPackCart: state => {
      state.cartItems = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPacks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPacks.fulfilled, (state, action) => {
        state.loading = false;
        state.first = action.payload.first;
        state.last = action.payload.last;
        state.items = action.payload.items;
        state.next = action.payload.next;
        state.prev = action.payload.prev;
        state.pages = action.payload.pages;

        state.packList =
          action.payload.prev == null
            ? action.payload.data
            : [...state.packList, ...action.payload.data];
      })
      .addCase(fetchPacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSinglePack.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSinglePack.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePack = action.payload;
      })
      .addCase(getSinglePack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addPackToCart,
  decreasePackQuantity,
  removePackFromCart,
  clearPackCart,
} = packSlice.actions;

export const packReducer = packSlice.reducer;
