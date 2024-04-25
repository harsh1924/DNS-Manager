import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../Helper/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    domainData: []
};

export const createDomain = createAsyncThunk('/auth/upload', async (data) => {
    try {
        let res = axiosInstance.post('/domain/upload', data);

        toast.promise(res, {
            loading: 'Uploading the domain...',
            success: 'Upload Successfull',
            error: 'Domain already exists'
        });

        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const createDomainManually = createAsyncThunk('/auth/upload-manually', async (data) => {
    try {
        let res = axiosInstance.post('/domain/upload-manually', data);

        toast.promise(res, {
            loading: 'Uploading the domain...',
            success: 'Upload Successfull',
            error: 'Domain already exists'
        });

        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const getAllDomains = createAsyncThunk('domain/get', async () => {
    try {
        const res = axiosInstance.get('/domain/domains');
        toast.promise(res, {
            loading: 'Loading Domains...',
            success: 'All Domains loaded successfully',
            error: 'Please Login to view domains'
        });

        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const editDomain = createAsyncThunk('/domain/edit',async(data) => {
    try {
        let res = axiosInstance.put(`/domain/edit/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: 'Updating...',
            success: 'Domain Updated Successfully',
            error: 'Failed to update domain'
        });
        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const deleteDomain = createAsyncThunk('/domain/delete', async(id) => {
    try {
        const res = axiosInstance.delete(`domain/delete/${id}`);
        toast.promise(res, {
            loading: 'Deleting the Domain',
            success: 'Domain deleted successfully',
            error: 'Failed to delete the domain'
        });
        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
})

const domainSlice = createSlice({
    name: 'domain',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllDomains.fulfilled, (state, action) => {
            if (action.payload) {
                state.domainData = [action.payload]
            }
        })
    }
});

export const { } = domainSlice.actions;
export default domainSlice.reducer;