import { configureStore } from '@reduxjs/toolkit';
import {goodsAPI} from './goodsAPI';

export const store = configureStore({
    reducer: {
        [goodsAPI.reducerPath]: goodsAPI.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(goodsAPI.middleware),
})
