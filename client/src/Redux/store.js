import { configureStore } from '@reduxjs/toolkit'
import domainSliceReducer from './domainSlice';
import authSliceReducer from './authSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        domain: domainSliceReducer,
    },
});

export default store;