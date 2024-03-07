import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiEndpoint } from './services/endpoint';
import authReducer from '../redux/services/authslice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    [apiEndpoint.reducerPath]: apiEndpoint.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiEndpoint.middleware),
})


export type AppDispatch =typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);