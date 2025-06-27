//Librery import
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';

//Local import
import UserReducer from '../slice/userSlice';
import {productReducer} from '../slice/productSlice';
import {packReducer} from '@redux/slice/packSlice';
import ThemeReducer from '../slice/themeslice';

const rootReducer = combineReducers({
  products: productReducer,
  packs: packReducer,
  theme: ThemeReducer,
  user: UserReducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'user'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
