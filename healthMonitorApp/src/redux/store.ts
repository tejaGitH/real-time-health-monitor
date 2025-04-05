// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import vitalsReducer from './vitalsSlice';
import deviceReducer from './deviceSlice';

const store = configureStore({
  reducer: {
    vitals: vitalsReducer,
    device: deviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;