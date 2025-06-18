// // Src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import productReducer from '../slice/productSlice'
// import ThemeReducer from '../slice/themeslice'
// import UserReducer from '../slice/userSlice'


// export const store = configureStore({
//   reducer: {
//     products: productReducer,
//     theme: ThemeReducer,
//     user:UserReducer,
//   },
// });


// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import productReducer from '../slice/productSlice';
import ThemeReducer from '../slice/themeslice';
import UserReducer from '../slice/userSlice';
// Combine reducers
const rootReducer = combineReducers({
  products: productReducer,
  theme: ThemeReducer,
  user: UserReducer,
});
// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'user'], // choose which slices to persist
};
// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable check for redux-persist
    }),
});
export const persistor = persistStore(store);









