// Librery import
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Local import
import {BASE_URL, products} from '@api/productApi';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, {rejectWithValue}) => {
    const {page = 1, per_page = 10} = params;
    try {
      const res = await axios.get(`${BASE_URL}${products}?_per_page=${per_page}&_page=${page}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  'products/getSingleProduct',
  async (productId, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${BASE_URL}${products}/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


      
// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    productlist: [],
    cartItems: [],
    singleproduct: null,
    loading: false,
    error: null,
    first: 1,
    items: 0,
    last: 0,
    next: 0,
    pages: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      
      const product = action.payload;
      const existing = state.cartItems.find(item => item.id === product.id);
      
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(p => p.id === action.payload);
      if (item) {
        item.quantity > 1
          ? (item.quantity -= 1)
          : (state.cartItems = state.cartItems.filter(p => p.id !== item.id));
      }
    },
    
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.first = action.payload.first;
        state.last = action.payload.last;
        state.items = action.payload.items;
        state.next = action.payload.next;
        state.prev = action.payload.prev;
        state.pages = action.payload.pages;
        state.productlist =
          action.payload.prev == null
            ? action.payload.data
            : [...state.productlist, ...action.payload.data];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleproduct = action.payload;
      })
      
  }
});

export const { addToCart,
  decreaseQuantity} = productSlice.actions;
export const productReducer = productSlice.reducer;
