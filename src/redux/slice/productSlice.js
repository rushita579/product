import {BASE_URL, packs, products} from '@api/productApi';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
   async (params = {}, { rejectWithValue }) => {
    const { page = 1, per_page = 10 } = params;
    console.log(BASE_URL + products + `?_per_page=${per_page}&_page=${page}`,'url');
    try { 
      const res = await axios.get(BASE_URL + products + `?_per_page=${per_page}&_page=${page}`);  
      
      return res.data;
    } catch (err){
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  },
);

export const getSingleProduct = createAsyncThunk(
  'products/getSingleProduct',
  async (productId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${products}/${productId}`,
      );
      
      return response.data;
    } catch (error) {  
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    productlist: [],
    singleproduct: null,
    loading: false,
    error: null,
    first:1,
    items:0,
    last:0,
    next:0,
    pages:0,

  },
  reducers: {},
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
        
        if(action.payload.prev==null){
          
          state.productlist = action.payload.data;
        }else{

          state.productlist = [...state.productlist,...action.payload.data]
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      });
    builder
      .addCase(getSingleProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleproduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
      });
  },
});




export const productReducer = productSlice.reducer;