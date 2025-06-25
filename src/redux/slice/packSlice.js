import {BASE_URL, packs, products} from '@api/productApi';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPacks = createAsyncThunk(
  'packs/fetchPacks',
  async (params = {}, { rejectWithValue }) => {
    const { page = 1, per_page = 10 } = params;
    try {
      const res = await axios.get(`${BASE_URL}${packs}?_per_page=${per_page}&_page=${page}`);
      return res.data; // Corrected from packsRes.data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
); 
export const getSinglePack = createAsyncThunk(
  'packs/getSinglePack',
  async (packId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}${packs}/${packId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const packSlice = createSlice({
  name: 'packs',
  initialState: {
    packList: [],
    singlePack: null,
    loading: false,
    error: null,
    first: 1,
    items: 0,
    last: 0,
    next: 0,
    pages: 0,
    prev: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPacks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPacks.fulfilled, (state, action) => {
        state.loading = false;

        // Update pagination state
        state.first = action.payload.first;
        state.last = action.payload.last;
        state.items = action.payload.items;
        state.next = action.payload.next;
        state.prev = action.payload.prev;
        state.pages = action.payload.pages;

        // Append or replace data depending on page
        if (action.payload.prev == null) {
          state.packList = action.payload.data; // First page
        } else {
          state.packList = [...state.packList, ...action.payload.data]; // Next pages
        }
      })
      .addCase(fetchPacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
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



export const packReducer = packSlice.reducer;
