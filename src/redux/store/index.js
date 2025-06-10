// Src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slice/productSlice'
import ThemeReducer from '../slice/themeslice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    theme: ThemeReducer,
  },
});
