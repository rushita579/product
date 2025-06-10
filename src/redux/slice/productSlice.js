// Src/redux/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  categoryFilter: 'All',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    updateProduct(state, action) {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteProduct(state, action) {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    toggleStock(state, action) {
      const product = state.items.find(p => p.id === action.payload);
      if (product) product.inStock = !product.inStock;
    },
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleStock,
  setCategoryFilter,
} = productSlice.actions;

export default productSlice.reducer;
