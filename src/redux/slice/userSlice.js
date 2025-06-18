// Src/redux/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  product: null,
};

const userSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loginuser(state, action) {
      state.user = action.payload;
    },
    logoutuser(state, action) {
      state.user = null;
    },
    updateuser(state, action) {
      state.user = action.payload;
    },
},
});

export const {
  loginuser,
  logoutuser,
  updateuser,
} = userSlice.actions;

export default userSlice.reducer;
