import {BASE_URL, packs, products} from '@api/productApi';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page, {rejectWithValue}) => {
    try { 

      const res = await axios.get(BASE_URL + products);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  },
);
export const getSingleProduct = createAsyncThunk(
  'products/getSingleProduct',
  async (productId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/${productId}`,
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
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productlist = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
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

export const fetchPacks = createAsyncThunk(
  'packs/fetchPacks',
  async (_, { rejectWithValue }) => {
    try {
      const packsRes = await axios.get(BASE_URL + packs);

      return packsRes.data;
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
    loading: false,
    error: null,
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
        state.packList = action.payload;
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
// export default{ productSlice.reducer ,};


export const productReducer = productSlice.reducer;
export const packReducer = packSlice.reducer;