import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    data: localStorage.getItem('data') || {},
    role: localStorage.getItem('role') || ''
};

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
    try {
        let res = axiosInstance.post('/user/signup', data);
        toast.promise(res, {
            loading: 'Wait! Creating your account',
            success: 'Account Created Successfully',
            error: data?.error?.message
        });
        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const login = createAsyncThunk('auth/login', async(data) => {
    try {
        let res = axiosInstance.post('/user/login', data);
        await toast.promise(res, {
            loading: 'Loading...',
            success: 'User Logged in successfully',
            error: 'Failed to Login'
        });
        
        return (await res).data;
    } catch (error) {
        toast.error(error.message)
    }
});

export const logout = createAsyncThunk('auth/logout', async()=>{
    try {
        let res = axiosInstance.post('/user/logout');
        await toast.promise(res, {
            loading: 'Loading',
            success: 'User Logged Out Successfully',
            error: 'Failed to logout'
        });
        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const getUserData = createAsyncThunk('/user/details', async () => {
    try {
        const res = await axiosInstance.get('/user/me');
        return res?.data;
    } catch (error) {
        toast.error(error.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action?.payload?.user));
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.isLoggedIn = false;
                state.data = {};
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action?.payload?.data?.user));
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.isLoggedIn = action?.payload?.user?.role;
            })
    }
});

export const { } = authSlice.actions;
export default authSlice.reducer;