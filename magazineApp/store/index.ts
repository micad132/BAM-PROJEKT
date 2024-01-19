import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import productReducer from './reducers/productReducer';
import storageReducer from './reducers/storageReducer';

export const store = configureStore({
  reducer: {
    product: productReducer,
    storage: storageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
